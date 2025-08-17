const fs = require('fs');
const path = require('path');
const axios = require('axios');
const os = require('os');
const { execSync } = require('child_process');
const express = require('express');
const app = express();
const port = process.env.PORT || 9090;

// Configuration
const config = {
  SOURCE_REPO: process.env.SOURCE_REPO || 'https://github.com/pknexus1/NEXUS-V2-AI', // GitHub repo URL
  SOURCE_ZIP: process.env.SOURCE_ZIP || 'https://github.com/pknexus1/NEXUS-V2-AI/archive/main.zip', // Direct zip download
  BRANCH: process.env.BRANCH || 'main', // Branch to download
  AUTO_UPDATE: process.env.AUTO_UPDATE || 'true', // Enable auto-update
  UPDATE_INTERVAL: process.env.UPDATE_INTERVAL || 3600000, // 1 hour in ms
  INSTALL_DEPENDENCIES: process.env.INSTALL_DEPENDENCIES || 'true' // Auto install dependencies
};

// Create temp directory
const tempDir = path.join(os.tmpdir(), 'nexus-temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Download and extract source code
async function downloadSourceCode() {
  try {
    console.log('Downloading source code...');
    
    // Create download URL if not provided
    const downloadUrl = config.SOURCE_ZIP || 
      `${config.SOURCE_REPO}/archive/refs/heads/${config.BRANCH}.zip`;
    
    const zipPath = path.join(tempDir, 'source.zip');
    const extractPath = path.join(tempDir, 'extracted');
    
    // Download the zip file
    const response = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'arraybuffer'
    });
    
    fs.writeFileSync(zipPath, response.data);
    console.log('Source code downloaded');
    
    // Extract the zip file
    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath);
    }
    
    const extract = require('extract-zip');
    await extract(zipPath, { dir: extractPath });
    console.log('Source code extracted');
    
    // Find the extracted folder (GitHub adds branch name to folder)
    const extractedFolders = fs.readdirSync(extractPath);
    const sourceFolder = path.join(extractPath, extractedFolders[0]);
    
    // Copy files to current directory
    const copyRecursiveSync = (src, dest) => {
      const exists = fs.existsSync(src);
      const stats = exists && fs.statSync(src);
      const isDirectory = exists && stats.isDirectory();
      
      if (isDirectory) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(childItemName => {
          copyRecursiveSync(path.join(src, childItemName), 
                          path.join(dest, childItemName));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };
    
    copyRecursiveSync(sourceFolder, __dirname);
    console.log('Files copied to application directory');
    
    // Clean up
    fs.unlinkSync(zipPath);
    fs.rmSync(extractPath, { recursive: true, force: true });
    
    // Install dependencies if needed
    if (config.INSTALL_DEPENDENCIES === 'true') {
      console.log('Installing dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      console.log('Dependencies installed');
    }
    
    console.log('Source code update complete');
    return true;
  } catch (error) {
    console.error('Error downloading source code:', error);
    return false;
  }
}

// Check for updates periodically
async function startAutoUpdate() {
  if (config.AUTO_UPDATE === 'true') {
    console.log('Auto-update enabled');
    setInterval(async () => {
      console.log('Checking for updates...');
      await downloadSourceCode();
    }, parseInt(config.UPDATE_INTERVAL));
  }
}

// Express server
app.get("/", (req, res) => {
  res.send("NEXUS AI UPDATER SERVICE ✅");
});

app.listen(port, () => {
  console.log(`Updater service running on port ${port}`);
});

// Initialize
(async () => {
  await downloadSourceCode();
  startAutoUpdate();
  
  // Start main bot after update
  console.log('Starting main bot...');
  require('./main'); // Assuming your main bot file is main.js
})();
