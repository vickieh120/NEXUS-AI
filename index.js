const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');
const AdmZip = require('adm-zip'); // npm install adm-zip

// URL ya private zip (source code)
const ZIP_URL = 'https://github.com/username/private-repo/archive/refs/heads/main.zip';
const ZIP_FILE = 'bot.zip';
const EXTRACT_DIR = './bot';

// download zip file
function downloadZip(url, dest, cb) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error('Error downloading zip:', err.message);
    });
}

// extract zip
function extractZip(zipPath, outDir) {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(outDir, true);
}

// run bot
function runBot() {
    exec('node bot/index.js', (err, stdout, stderr) => {
        if (err) console.error(err);
        console.log(stdout);
    });
}

// bootstrap
downloadZip(ZIP_URL, ZIP_FILE, () => {
    console.log('Downloaded bot zip.');
    extractZip(ZIP_FILE, EXTRACT_DIR);
    console.log('Extracted bot.');
    runBot();
});
