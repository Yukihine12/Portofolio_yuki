const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read and parse markdown files
const getMarkdownContent = (filename) => {
  try {
    const filePath = path.join(__dirname, 'content', filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { data, content };
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// API Endpoint for aggregated portfolio data
app.get('/api/portfolio-data', (req, res) => {
  const files = [
    { key: 'profile', file: 'profile.md' },
    { key: 'skills', file: 'skills.md' },
    { key: 'projects', file: 'projects.md' },
    { key: 'education', file: 'education.md' },
    { key: 'experience', file: 'experience.md' },
    { key: 'certifications', file: 'certifications.md' }
  ];

  const portfolioData = {};

  for (const item of files) {
    const parsed = getMarkdownContent(item.file);
    if (parsed) {
      // gray-matter parses the frontmatter into the `data` property.
      // If the file is parsed successfully, we capture the data object.
      portfolioData[item.key] = parsed.data;
    } else {
      console.warn(`Warning: Failed to load ${item.file}`);
      portfolioData[item.key] = null;
    }
  }

  res.json({
    success: true,
    data: portfolioData
  });
});

// Legacy API Endpoint for profile (kept as a fallback)
app.get('/api/profile', (req, res) => {
  const profileData = getMarkdownContent('profile.md');
  
  if (profileData) {
    res.json({
      success: true,
      data: profileData.data,
      content: profileData.content
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to read profile data'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
