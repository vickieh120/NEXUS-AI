const {
  zokou
} = require(__dirname + "/../framework/zokou");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
  'nomCom': "menu",
  'categorie': "Menu"
}, async (dest, zk, commandOptions) => {
  let {
    ms,
    repondre,
    prefixe,
    nomAuteurMessage,
    mybotpic
  } = commandOptions;
  
  let {
    cm
  } = require(__dirname + "/../framework/zokou");
  
  let categorizedCommands = {};
  let mode = "public";
  
  if (s.MODE.toLowerCase() !== "yes") {
    mode = "private";
  }
  
  cm.map(cmd => {
    if (!categorizedCommands[cmd.categorie]) {
      categorizedCommands[cmd.categorie] = [];
    }
    categorizedCommands[cmd.categorie].push(cmd.nomCom);
  });
  
  moment.tz.setDefault("Etc/GMT");
  const currentDate = moment().format("DD/MM/YYYY");
  
  // Beautiful header design
  let header = `
╔═══════════════════════╗
║      🚀 NEXUS-AI      ║
║    🤖 BOT MENU        ║
╚═══════════════════════╝

✨ *Bot Information* ✨
• 👑 Owner: ${s.OWNER_NAME}
• ⚡ Prefix: [ ${s.PREFIXE} ]
• 🔒 Mode: ${mode}
• 📊 RAM: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
• 📅 Date: ${currentDate}
• 🖥️ Platform: ${os.platform()}
• 👨‍💻 Creator: PK Driller
• 📋 Commands: ${cm.length}
• 🎨 Theme: NEXUS-AI

╔═══════════════════════╗
║    📋 COMMAND LIST    ║
╚═══════════════════════╝
`;

  // Build the command list with beautiful formatting
  let commandList = "";
  for (const category in categorizedCommands) {
    commandList += `
╭─「 📁 ${category.toUpperCase()} 」─⭓
│
`;
    
    let commands = categorizedCommands[category];
    let row = "";
    for (let i = 0; i < commands.length; i++) {
      if (i % 2 === 0 && i !== 0) {
        commandList += `│  ${row}\n`;
        row = "";
      }
      row += `│ • ${s.PREFIXE}${commands[i].padEnd(15)}`;
    }
    
    if (row !== "") {
      commandList += `│  ${row}\n`;
    }
    
    commandList += `│
╰───────────────────────⭓
`;
  }
  
  // Footer with social links
  let footer = `
🔗 *Follow Our Channels*:
• WhatsApp: https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x
• GitHub: https://github.com/pkdriller0

💫 *NEXUS-AI - Advanced AI Pairing Technology* 💫

⭐ *Type ${s.PREFIXE}help <command> for more info* ⭐
`;

  const fullMessage = header + commandList + footer;

  try {
    await zk.sendMessage(dest, {
      'text': fullMessage,
      'contextInfo': {
        'forwardingScore': 999,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363288304618280@newsletter",
          'newsletterName': "NEXUS-AI CHANNEL",
          'serverMessageId': 143
        },
        'externalAdReply': {
          'title': "🚀 NEXUS-AI BOT",
          'body': "Advanced AI Pairing Technology",
          'thumbnailUrl': "https://files.catbox.moe/q99uu1.jpg",
          'mediaType': 1,
          'renderLargerThumbnail': true,
          'sourceUrl': "https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x"
        }
      }
    });
  } catch (error) {
    console.error("Menu error: ", error);
    repondre("Menu error: " + error);
  }
});
