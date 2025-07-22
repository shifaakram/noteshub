// C:\Users\shifa\OneDrive\Documents\ReactNative\ComputerBackend\server.js

const express = require('express');
const bodyParser = require('body-parser'); // Not strictly needed for GET requests, but good to keep for potential future POST/PUT
const cors = require('cors');
const fs = require('fs-extra'); // Using fs-extra for convenience (like pathExists)
const path = require('path');

const app = express();
const PORT = 3000; // Standard port for development

// Define the directory where your extracted content is stored
// This MUST match the OUTPUT_DIR in your extractContent.js
const EXTRACTED_CONTENT_DIR = path.join(__dirname, 'extracted_chapter_content');

// Middlewares
app.use(bodyParser.json()); // To parse JSON bodies (useful if you add POST requests later)
app.use(cors()); // To allow your React Native app to connect to this server
                 // CRUCIAL for development across different origins (e.g., your phone/emulator and your computer)

// --- Metadata for your chapters (MUST match 'unit' and 'title' from extractContent.js for Computer Science) ---
// This list is used by the server to identify the correct filename for the chapter's text file.
const chaptersMeta = [
  {
    unit: "01",
    title: "Fundamentals of Computer",
  },
  {
    unit: "02",
    title: "Fundamentals of Operating System",
  },
  {
    unit: "03",
    title: "Office Automation",
  },
  {
    unit: "04",
    title: "Data Communication and Computer Networks",
  },
  {
    unit: "05",
    title: "Computer Security and Ethics",
  },
  {
    unit: "06",
    title: "Web Development",
  },
  {
    unit: "07",
    title: "Introduction to Database System",
  },
  // If you later extract additional sections (like Computer Practicals, Abbreviations etc.),
  // you would add their { unit, title } objects here, ensuring they match
  // how you defined them in extractContent.js and how their files are named.
];

// Helper function to sanitize filename (same as in extractContent.js)
// This is essential to ensure the server looks for files with the exact same names
// that extractContent.js generated.
const sanitizeFilename = (name) => {
  return name.replace(/[^a-z0-9_ -]/gi, '').replace(/ /g, '_');
  // Removed \u0600-\u06FF (Urdu Unicode range) as this is for Computer Science
};

// --- API Endpoint: Serve Chapter Content ---
// This endpoint will respond to requests like:
// http://YOUR_COMPUTER_IP_ADDRESS:3000/chapter-content/01
app.get('/chapter-content/:unit', async (req, res) => {
    const { unit } = req.params; // Get the 'unit' from the URL parameter (e.g., "01")

    // Find the chapter in our metadata list using the unit
    const chapter = chaptersMeta.find(c => c.unit === unit);

    if (!chapter) {
        console.warn(`[Backend] Request for unknown unit: ${unit}. Not found in chaptersMeta.`);
        return res.status(404).json({ message: `Chapter with unit '${unit}' not found in backend metadata.` });
    }

    // Construct the expected filename. This MUST perfectly match how extractContent.js names the files.
    const filename = `${chapter.unit}_${sanitizeFilename(chapter.title)}.txt`;
    const filePath = path.join(EXTRACTED_CONTENT_DIR, filename);

    console.log(`[Backend] Request received for unit ${unit}. Attempting to read file: ${filePath}`);

    try {
        // Check if the file exists before trying to read it
        const fileExists = await fs.pathExists(filePath);
        if (!fileExists) {
            console.error(`[Backend ERROR] Chapter content file not found at: ${filePath}`);
            return res.status(404).json({ message: `Failed to retrieve chapter content for unit '${unit}'. File '${filename}' might be missing or not extracted.` });
        }

        // Read the content of the file
        const content = await fs.readFile(filePath, 'utf8');

        // Send the raw text content as the response
        res.status(200).type('text/plain').send(content); // Explicitly set content-type to text/plain
        console.log(`[Backend] Successfully served content for unit ${unit}: ${filename}`);

    } catch (error) {
        console.error(`[Backend ERROR] Error reading or serving file for unit ${unit} (${filename}):`, error.message);
        res.status(500).json({ message: `Internal Server Error: Could not retrieve chapter content for unit '${unit}'. Check server logs.` });
    }
});

// --- Basic Health Check Endpoint (Optional) ---
// You can visit http://YOUR_COMPUTER_IP_ADDRESS:3000/ in your browser to check if the server is running.
app.get('/', (req, res) => {
    res.status(200).send('ComputerBackend server is running!');
});


// --- Start the server ---
app.listen(PORT, () => {
    console.log(`ComputerBackend server running on http://localhost:${PORT}`);
    console.log(`Chapter content API available at http://localhost:${PORT}/chapter-content/:unit`);
    console.log(`Example for Unit 01: http://localhost:${PORT}/chapter-content/01`);
    console.log('\nRemember to replace "localhost" with your computer\'s actual IP address when connecting from a mobile device/emulator.');
});