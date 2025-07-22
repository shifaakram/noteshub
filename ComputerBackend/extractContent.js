// UrduBackend/extractContent.js

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

// --- Configuration ---
const OUTPUT_DIR = path.join(__dirname, 'extracted_chapter_content'); // Folder to save extracted text
const DEFAULT_SELECTOR = '.post-body.entry-content'; // Common CSS selector for blog post content

// Define the chapters you want to extract
// !!! IMPORTANT: You MUST replace 'YOUR_CHAPTER_URL_HERE' with the SPECIFIC URL for each chapter's content.
// You will need to manually browse the blog (iqbaljahanakademy.blogspot.com) to find the unique link for each chapter.
const chaptersToExtract = [
  {
    unit: "01",
    title: "Fundamentals of Computer",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/01/computer-science-new-for-class-ix-unit_33.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "02",
    title: "Fundamentals of Operating System",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/02/computer-science-new-for-class-ix-unit_5.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "03",
    title: "Office Automation",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/02/computer-science-new-for-class-ix-unit_28.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "04",
    title: "Data Communication and Computer Networks",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/07/computer-science-new-for-class-ix-unit.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "05",
    title: "Computer Security and Ethics",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/05/computer-science-new-for-class-ix-unit_16.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "06",
    title: "Web Development",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/04/computer-science-new-for-class-ix-unit_5.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "07",
    title: "Introduction to Database System",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2021/03/computer-science-new-for-class-ix-unit_31.html', // REPLACE WITH ACTUAL URL
    selector: DEFAULT_SELECTOR
  },
  // Additional sections mentioned in the chapter list (if you want to extract them)
  // You would need to find specific URLs for these sections as well.
  // {
  //   unit: "A1", // Example unit for an additional section
  //   title: "Computer Practicals",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
  // {
  //   unit: "A2",
  //   title: "Abbreviations",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
  // {
  //   unit: "A3",
  //   title: "Short Cut Keys Of Computer",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
  // {
  //   unit: "A4",
  //   title: "General Website Links Given in The Textbook",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
  // {
  //   unit: "A5",
  //   title: "Solved Model Papers for Class IX (Science Group)",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
  // {
  //   unit: "A6",
  //   title: "Solved Model Papers for Class IX (Arts / General Group)",
  //   blogUrl: 'YOUR_SECTION_URL_HERE',
  //   selector: DEFAULT_SELECTOR
  // },
];

// --- Function to sanitize filename ---
// Removes special characters that might cause issues in filenames
const sanitizeFilename = (name) => {
  return name.replace(/[^a-z0-9_\u0600-\u06FF -]/gi, '').replace(/ /g, '_');
};

// --- Function to fetch and extract content for a single chapter ---
async function fetchAndExtract(chapter) {
  const { unit, title, blogUrl, selector } = chapter;
  const filename = `${unit}_${sanitizeFilename(title)}.txt`;
  const filePath = path.join(OUTPUT_DIR, filename);

  console.log(`Processing Chapter ${unit}: ${title} from ${blogUrl}`);

  try {
    const response = await axios.get(blogUrl);
    const $ = cheerio.load(response.data); // Load the HTML into Cheerio

    // Extract content based on the provided selector
    const content = $(selector).text(); // Get all text content within the selected element

    if (!content || content.trim().length === 0) {
      console.warn(`WARNING: No content found for Chapter ${unit} (${title}) with selector '${selector}'. URL: ${blogUrl}`);
      // Consider adding a default message or skipping this chapter if no content is found
      await fs.writeFile(filePath, `No content extracted for this chapter. Please check the blogUrl and selector in extractContent.js. Original URL: ${blogUrl}`, 'utf8');
      return { unit, title, status: 'No Content', filePath, url: blogUrl };
    }

    // Clean up extra whitespace and trim
    const cleanedContent = content.replace(/\s\s+/g, ' ').trim();

    // Ensure the output directory exists
    await fs.ensureDir(OUTPUT_DIR);

    // Save the cleaned content to a file
    await fs.writeFile(filePath, cleanedContent, 'utf8');
    console.log(`SUCCESS: Chapter ${unit} content saved to ${filePath}`);
    return { unit, title, status: 'Success', filePath, url: blogUrl };

  } catch (error) {
    console.error(`ERROR processing Chapter ${unit} (${title}) from ${blogUrl}: ${error.message}`);
    // Save an error message to the file if extraction fails
    await fs.ensureDir(OUTPUT_DIR);
    await fs.writeFile(filePath, `Error extracting content for this chapter: ${error.message}. Please check the blogUrl. Original URL: ${blogUrl}`, 'utf8');
    return { unit, title, status: 'Error', error: error.message, url: blogUrl };
  }
}

// --- Main function to run the extraction for all chapters ---
async function main() {
  console.log(`Starting content extraction to: ${OUTPUT_DIR}\n`);

  const results = [];
  for (const chapter of chaptersToExtract) {
    const result = await fetchAndExtract(chapter);
    results.push(result);
    // Add a small delay to avoid overwhelming the server with requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n--- Extraction Summary ---');
  results.forEach(res => {
    if (res.status === 'Success') {
      console.log(`✅ Unit ${res.unit} - "${res.title}": Successfully extracted.`);
    } else {
      console.error(`❌ Unit ${res.unit} - "${res.title}": ${res.status} - ${res.error || 'Check URL/Selector'}. URL: ${res.url}`);
    }
  });

  console.log('\nExtraction process finished.');
  console.log('Please check the `extracted_chapter_content` folder for the output files.');
  console.log('If you see "No content found" or "Error" messages, carefully review the `blogUrl` and `selector` for those chapters in `extractContent.js`.');
}

// Run the main function
main();