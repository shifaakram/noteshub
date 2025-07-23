// server.js - UPDATED (Removed Wikipedia Search)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
// Removed: const WikiJS = require('wikijs').default;

const app = express();
const PORT = 3000;

const EXTRACTED_CONTENT_DIR = path.join(__dirname, 'extracted_chapter_content');

app.use(bodyParser.json());
app.use(cors());

const chaptersMeta = [
  { unit: "01", title: "Fundamentals of Computer" },
  { unit: "02", title: "Fundamentals of Operating System" },
  { unit: "03", title: "Office Automation" },
  { unit: "04", title: "Data Communication and Computer Networks" },
  { unit: "05", title: "Computer Security and Ethics" },
  { unit: "06", title: "Web Development" },
  { unit: "07", title: "Introduction to Database System" },
];

const sanitizeFilename = (name) =>
  name.replace(/[^a-z0-9_ -]/gi, '').replace(/ /g, '_');

// Removed STOPWORDS and related functions as they are no longer needed for Wiki search
// const STOPWORDS = new Set([...]);
// function extractKeywords(text) { ... }
// function containsAnyKeyword(text, keywords) { ... }
// function isRelevantWikiResult(...) { ... }


app.get('/chapter-content/:unit', async (req, res) => {
  const { unit } = req.params;
  const chapter = chaptersMeta.find(c => c.unit === unit);

  if (!chapter) {
    return res.status(404).json({ message: `Chapter with unit '${unit}' not found.` });
  }

  const filename = `${chapter.unit}_${sanitizeFilename(chapter.title)}.txt`;
  const filePath = path.join(EXTRACTED_CONTENT_DIR, filename);

  try {
    const fileExists = await fs.pathExists(filePath);
    if (!fileExists) {
      return res.status(404).json({ message: `File '${filename}' for unit '${unit}' not found. No local content available.` });
    }
    const content = await fs.readFile(filePath, 'utf8');
    res.status(200).type('text/plain').send(content);
  } catch (error) {
    console.error(`Error retrieving chapter content for unit ${unit}:`, error);
    res.status(500).json({ message: `Internal Server Error: Could not retrieve chapter content.` });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('ComputerBackend server is running!');
});

app.post('/chat', async (req, res) => {
  const { prompt, unit } = req.body;
  if (!prompt || !unit) {
    return res.status(400).json({ response: "Missing prompt or unit." });
  }

  const chapter = chaptersMeta.find(c => c.unit === unit);
  if (!chapter) {
    return res.status(404).json({ response: `Chapter with unit '${unit}' not found.` });
  }

  // The backend will no longer perform AI generation or Wikipedia search.
  // Its only role related to chat is to provide chapter content if requested by frontend,
  // but in this setup, the frontend directly pulls content via /chapter-content.
  // This /chat endpoint now serves as a simple fallback or could be removed entirely
  // if Gemini always processes on the frontend.
  // For now, it will simply indicate that no internet search is being performed.

  // The chat logic is now handled predominantly on the frontend with Gemini.
  // This endpoint can return a default response or be used for other backend tasks.
  res.json({ response: "This backend no longer performs AI generation or Wikipedia searches directly for chat queries. All intelligent processing happens on the client-side with chapter content." });
});


app.listen(PORT, () => {
  console.log(`ComputerBackend server running on http://192.168.100.12:${PORT}`);
  console.log(`Chapter content API available at http://192.168.100.12:${PORT}/chapter-content/:unit`);
});