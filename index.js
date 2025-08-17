const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  isJidBroadcast,
  getContentType,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  AnyMessageContent,
  prepareWAMessageMedia,
  areJidsSameUser,
  downloadContentFromMessage,
  MessageRetryMap,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID, makeInMemoryStore,
  jidDecode,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys')

const fs = require('fs')
const path = require('path')
const os = require('os')
const axios = require('axios')
const { execSync } = require('child_process')
const express = require('express')
const app = express()
const port = process.env.PORT || 9090

// Core Configuration
const coreConfig = {
  REPO_URL: process.env.REPO_URL || 'https://github.com/pknexus1/NEXUS-V2-AI',
  CORE_FILES: [
    'package.json',
    'config.js',
    'Dockerfile',
    '.gitignore',
    'command.js',
    'sessions/creds.json'
  ],
  BRANCH: process.env.BRANCH || 'main',
  AUTO_UPDATE: process.env.AUTO_UPDATE === 'true',
  INSTALL_DEPS: process.env.INSTALL_DEPS === 'true',
  SESSION_URL: process.env.SESSION_URL || ''
}

// Ensure required directories exist
const ensureDirectories = () => {
  const requiredDirs = [
    path.join(__dirname, 'sessions'),
    path.join(__dirname, 'lib'),
    path.join(__dirname, 'plugins'),
    path.join(__dirname, 'data')
  ]

  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// Download single file from GitHub
const downloadCoreFile = async (filePath) => {
  try {
    const rawUrl = `${coreConfig.REPO_URL.replace('github.com', 'raw.githubusercontent.com')}/${coreConfig.BRANCH}/${filePath}`
    const response = await axios.get(rawUrl, { responseType: 'text' })
    
    // Ensure directory structure exists
    const dirname = path.dirname(filePath)
    if (dirname && !fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true })
    }

    fs.writeFileSync(filePath, response.data)
    console.log(`Downloaded: ${filePath}`)
    return true
  } catch (error) {
    console.error(`Error downloading ${filePath}:`, error.message)
    return false
  }
}

// Handle session file
const handleSessionFile = async () => {
  const sessionPath = 'sessions/creds.json'
  
  if (!fs.existsSync(sessionPath) || fs.statSync(sessionPath).size === 0) {
    if (coreConfig.SESSION_URL) {
      console.log('Downloading session file from URL...')
      try {
        const response = await axios.get(coreConfig.SESSION_URL, { responseType: 'arraybuffer' })
        fs.writeFileSync(sessionPath, response.data)
        console.log('Session file downloaded successfully')
      } catch (error) {
        console.error('Error downloading session file:', error.message)
      }
    } else {
      console.log('No session file found and no SESSION_URL provided')
    }
  }
}

// Update core files
const updateCoreFiles = async () => {
  console.log('Checking for core file updates...')
  
  const results = await Promise.all(
    coreConfig.CORE_FILES.map(file => downloadCoreFile(file))
  )

  if (results.some(success => success) {
    if (coreConfig.INSTALL_DEPS) {
      console.log('Installing/updating dependencies...')
      execSync('npm install', { stdio: 'inherit' })
      console.log('Dependencies installed')
    }
  }
}

// Initialize the system
const initialize = async () => {
  ensureDirectories()
  await handleSessionFile()
  
  if (coreConfig.AUTO_UPDATE) {
    await updateCoreFiles()
  }

  // Now require the config after potential update
  const config = require('./config')
  const l = console.log
  const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
  const { AntiDelDB, initializeAntiDeleteSettings, setAnti, getAnti, getAllAntiDeleteSettings, saveContact, loadMessage, getName, getChatSummary, saveGroupMetadata, getGroupMetadata, saveMessageCount, getInactiveGroupMembers, getGroupMembersMessageCount, saveMessage } = require('./data')
  const ff = require('fluent-ffmpeg')
  const P = require('pino')
  const GroupEvents = require('./lib/groupevents')
  const qrcode = require('qrcode-terminal')
  const StickersTypes = require('wa-sticker-formatter')
  const util = require('util')
  const { sms, downloadMediaMessage, AntiDelete } = require('./lib')
  const FileType = require('file-type')
  const { fromBuffer } = require('file-type')
  const bodyparser = require('body-parser')
  const Crypto = require('crypto')
  const prefix = config.PREFIX

  const ownerNumber = ['254799056874']

  // ================== AUTO BIO CONFIG ==================
  const bioQuotes = [
    () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      })
      return `⏰ ${timeString} | NEXUS-AI 🤖 | Always Active Success is a consequence and must must not be a goal | Nairobi Time`
    },
    // ... rest of your bioQuotes array ...
  ]

  let currentBioIndex = 0

  const updateBio = async (conn) => {
    try {
      const newBio = bioQuotes[currentBioIndex]()
      await conn.updateProfileStatus(newBio)
      console.log(`Bio updated to: ${newBio}`)
      
      currentBioIndex = (currentBioIndex + 1) % bioQuotes.length
    } catch (error) {
      console.error('Error updating bio:', error)
    }
  }

  // ================== END AUTO BIO ==================

  const tempDir = path.join(os.tmpdir(), 'cache-temp')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  const clearTempDir = () => {
    fs.readdir(tempDir, (err, files) => {
      if (err) throw err
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), err => {
          if (err) throw err
        })
      }
    })
  }

  // Clear the temp directory every 5 minutes
  setInterval(clearTempDir, 5 * 60 * 1000)

  // WhatsApp connection function
  async function connectToWA() {
    console.log("Connecting to WhatsApp ⏳️...")
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/sessions/')
    var { version } = await fetchLatestBaileysVersion()
    
    const conn = makeWASocket({
      logger: P({ level: 'silent' }),
      printQRInTerminal: false,
      browser: Browsers.macOS("Firefox"),
      syncFullHistory: true,
      auth: state,
      version
    })
    
    // ... rest of your existing WhatsApp connection and event handling code ...
    // This includes all your conn.ev.on handlers, message processing, etc.
    // Just paste everything from your original file starting from here
  }

  // Express routes
  app.get("/", (req, res) => {
    res.send("NEXUS AI STARTED ✅")
  })

  app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`))

  // Start WhatsApp connection after a short delay
  setTimeout(() => {
    connectToWA()
  }, 4000)
}

// Start the application
initialize().catch(err => {
  console.error('Initialization error:', err)
  process.exit(1)
})
