// UrduBackend/extractContent.js

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');

// --- Configuration ---
const OUTPUT_DIR = path.join(__dirname, 'extracted_chapter_content'); // Folder to save extracted text
const DEFAULT_SELECTOR = '.post-body.entry-content'; // Common CSS selector for blog post content

// Define the chapters you want to extract
// !!! IMPORTANT: You MUST replace the generic 'blogUrl' with the SPECIFIC URL for each chapter's content.
// You might need to manually browse the blog (iqbaljahanakademy.blogspot.com) to find the unique link for each chapter.
const chaptersToExtract = [
  // --- حصہ نثر- مضامین (Prose - Essays) ---
  {
    unit: "01",
    title: "إخلأق نبوی ﷺ",
    blogUrl: 'https://ebooks.stbb.edu.pk/storage/uploads/books/1028329168.pdf', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "02",
    title: "امید کی خوشی",
    blogUrl: 'https://ebooks.stbb.edu.pk/storage/uploads/books/1028329168.pdf', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "03",
    title: "قومی ہمدردی",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/03_24.html', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "04",
    title: "رشتہ ناتا",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/03_56.html', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "05",
    title: "نظریۂ پاکستان",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/05_88.html', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر-افسانوی ادب (Prose - Fictional Literature) ---
  {
    unit: "06",
    title: "اصغری نے لڑکیوں کا مکتب بٹھایا",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/2018/11/06_34.html', // VERIFY THIS URL
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "07",
    title: "بوڑھی کاکی",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "08",
    title: "سیانا بادشاہ",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر- ڈرامہ / مکالمہ (Prose - Drama / Dialogue) ---
  {
    unit: "09",
    title: "شہید",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر -خاکہ ، آپ بیتی (Prose - Sketch, Autobiography) ---
  {
    unit: "10",
    title: "نام دیو - مالی",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "11",
    title: "ڈسٹرکٹ بورڈ کی ڈسپنسری",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر - طنز و مزاح (Prose - Satire & Humor) ---
  {
    unit: "12",
    title: "اونہہ",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر - سفر نامہ (Prose - Travelogue) ---
  {
    unit: "13",
    title: "کچھ ورق تاریخ سے",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نثر - مکاتیب (Prose - Letters) ---
  {
    unit: "14",
    title: "خط غالب - بنام ہرگوپال تفتہ",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "15",
    title: "خط غالب - بنام میر مہدی مجروح",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نظم - حمد و نعت (Poetry - Hymn & Na'at) ---
  {
    unit: "16",
    title: "حمد",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "17",
    title: "نعت",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "18",
    title: "برسات کا تماشا",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "19",
    title: "دنیاۓ اسلام",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "20",
    title: "سر راہ شہادت",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "21",
    title: "گرمی کی شدت",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "22",
    title: "جیوے جیوے پاکستان",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "23",
    title: "کرکث اور مشاعرہ",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },

  // --- حصہ نظم - غزلیات (Poetry - Ghazals) ---
  {
    unit: "24",
    title: "فقیرانہ آۓ صدا کر چلے",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "25",
    title: "دہہن پر ہیں ان کے گماں کیسے کیسے",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "26",
    title: "ہر ایک بات پہ کہتے ہو تم کہ\"تو کیا ہے؟\"",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "27",
    title: "لگتا نہیں ہے دل مرا اجڑے دیار میں",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "28",
    title: "دعا میں ذکر کیوں ہو مدعا کا",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "29",
    title: "جب تک انساں پاک طینت ہی نہیں",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
  {
    unit: "30",
    title: "ہونثوں پہ کبھی ان کے میرا نام ہی آۓ",
    blogUrl: 'https://iqbaljahanakademy.blogspot.com/p/blog-page.html', // !!! GENERIC - FIND SPECIFIC URL !!!
    selector: DEFAULT_SELECTOR
  },
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