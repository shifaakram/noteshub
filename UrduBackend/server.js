// C:\Users\shifa\OneDrive\Documents\ReactNative\React\urdubackend\server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra'); // Using fs-extra for convenience
const path = require('path');

const app = express();
const PORT = 3000; // Standard port for development

// Define the directory where your extracted content is stored
const EXTRACTED_CONTENT_DIR = path.join(__dirname, 'extracted_chapter_content');

// Middlewares
app.use(bodyParser.json()); // To parse JSON bodies (useful for future AI requests)
app.use(cors()); // To allow your React Native app to connect to this server

// Metadata for your chapters (MUST match 'unit' and 'title' from extractContent.js)
// This is used to construct the correct filename for the chapter's text file.
const chaptersMeta = [
    // --- حصہ نثر- مضامین (Prose - Essays) ---
    { unit: "01", title: "إخلأق نبوی ﷺ" },
    { unit: "02", title: "امید کی خوشی" },
    { unit: "03", title: "قومی ہمدردی" },
    { unit: "04", title: "رشتہ ناتا" },
    { unit: "05", title: "نظریۂ پاکستان" },
    // --- حصہ نثر-افسانوی ادب (Prose - Fictional Literature) ---
    { unit: "06", title: "اصغری نے لڑکیوں کا مکتب بٹھایا" },
    { unit: "07", title: "بوڑھی کاکی" },
    { unit: "08", title: "سیانا بادشاہ" },
    // --- حصہ نثر- ڈرامہ / مکالمہ (Prose - Drama / Dialogue) ---
    { unit: "09", title: "شہید" },
    // --- حصہ نثر -خاکہ ، آپ بیتی (Prose - Sketch, Autobiography) ---
    { unit: "10", title: "نام دیو - مالی" },
    { unit: "11", title: "ڈسٹرکٹ بورڈ کی ڈسپنسری" },
    // --- حصہ نثر - طنز و مزاح (Prose - Satire & Humor) ---
    { unit: "12", title: "اونہہ" },
    // --- حصہ نثر - سفر نامہ (Prose - Travelogue) ---
    { unit: "13", title: "کچھ ورق تاریخ سے" },
    // --- حصہ نثر - مکاتیب (Prose - Letters) ---
    { unit: "14", title: "خط غالب - بنام ہرگوپال تفتہ" },
    { unit: "15", title: "خط غالب - بنام میر مہدی مجروح" },
    // --- حصہ نظم - حمد و نعت (Poetry - Hymn & Na'at) ---
    { unit: "16", title: "حمد" },
    { unit: "17", title: "نعت" },
    { unit: "18", title: "برسات کا تماشا" },
    { unit: "19", title: "دنیاۓ اسلام" },
    { unit: "20", title: "سر راہ شہادت" },
    { unit: "21", title: "گرمی کی شدت" },
    { unit: "22", title: "جیوے جیوے پاکستان" },
    { unit: "23", title: "کرکث اور مشاعرہ" },
    // --- حصہ نظم - غزلیات (Poetry - Ghazals) ---
    { unit: "24", title: "فقیرانہ آۓ صدا کر چلے" },
    { unit: "25", title: "دہہن پر ہیں ان کے گماں کیسے کیسے" },
    { unit: "26", title: "ہر ایک بات پہ کہتے ہو تم کہ\"تو کیا ہے؟\"" },
    { unit: "27", title: "لگتا نہیں ہے دل مرا اجڑے دیار میں" },
    { unit: "28", title: "دعا میں ذکر کیوں ہو مدعا کا" },
    { unit: "29", title: "جب تک انساں پاک طینت ہی نہیں" },
    { unit: "30", title: "ہونثوں پہ کبھی ان کے میرا نام ہی آۓ" },
];

// Helper function to sanitize filename (same as in extractContent.js)
const sanitizeFilename = (name) => {
  return name.replace(/[^a-z0-9_\u0600-\u06FF -]/gi, '').replace(/ /g, '_');
};

// --- API Endpoint: Serve Chapter Content ---
app.get('/chapter-content/:unit', async (req, res) => {
    const { unit } = req.params; // Get the 'unit' from the URL parameter

    // Find the chapter metadata to get its title
    const chapter = chaptersMeta.find(c => c.unit === unit);

    if (!chapter) {
        return res.status(404).json({ message: `Chapter with unit '${unit}' not found in backend metadata.` });
    }

    // Construct the expected filename. This must match how extractContent.js names files.
    const filename = `${chapter.unit}_${sanitizeFilename(chapter.title)}.txt`;
    const filePath = path.join(EXTRACTED_CONTENT_DIR, filename);

    try {
        // Read the content of the file
        const content = await fs.readFile(filePath, 'utf8');
        // Send the raw text content as the response
        res.status(200).send(content);
        console.log(`[Backend] Served content for unit ${unit}: ${filename}`);
    } catch (error) {
        console.error(`[Backend ERROR] Could not read chapter content for unit ${unit} (${filename}):`, error.message);
        res.status(500).json({ message: `Failed to retrieve chapter content for unit '${unit}'. File might be missing or unreadable.` });
    }
});

// --- Basic Health Check Endpoint (Optional) ---
app.get('/', (req, res) => {
    res.status(200).send('UrduBackend server is running!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`UrduBackend server running on http://localhost:${PORT}`);
    console.log(`Chapter content API available at http://localhost:${PORT}/chapter-content/:unit`);
    console.log(`Example: Try visiting http://localhost:${PORT}/chapter-content/01 in your browser.`);
});