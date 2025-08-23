const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
  nomCom: "menu",
  categorie: "Menu"
}, async (dest, sock, ctx) => {
  let { repondre, mybotpic } = ctx;
  let { cm } = require(__dirname + "/../framework/zokou");

  // Group commands by category
  let categories = {};
  cm.map(cmd => {
    if (!categories[cmd.categorie]) categories[cmd.categorie] = [];
    categories[cmd.categorie].push(cmd.nomCom);
  });

  // Mode check
  let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

  // Date & Time
  moment.tz.setDefault("Etc/GMT");
  const date = moment().format("DD/MM/YYYY");

  // Header
  let header = `
╭━━━〔 ✦ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈 ✦ 〕━━━◆
┃ ◎ Owner     : ${s.OWNER_NAME}
┃ ◎ Prefix    : [ ${s.PREFIXE} ]
┃ ◎ Mode      : ${mode}
┃ ◎ RAM       : 8/132 GB
┃ ◎ Date      : ${date}
┃ ◎ Platform  : ${os.platform()}
┃ ◎ Creator   : PK Driller
┃ ◎ Commands  : ${cm.length}
┃ ◎ Theme     : NEXUS-AI
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  // Body (categories & commands)
  let body = "✨ *Available Commands* ✨\n";
  for (const cat in categories) {
    body += `\n╭───❖ *${cat.toUpperCase()}* ❖───╮\n`;
    categories[cat].forEach(cmd => {
      body += `│ • ${s.PREFIXE}${cmd}\n`;
    });
    body += `╰───────────────────◆\n`;
  }

  // Footer
  let footer = `\n🚀 Powered by *Pkdriller* | Official Channel: @NEXUS-AI`;

  try {
    await sock.sendMessage(dest, {
      text: header + "\n" + body + footer,
      contextInfo: {
        mentionedJid: [sock.user.id],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "NEXUS-AI",
          serverMessageId: -1
        },
        externalAdReply: {
          title: "NEXUS AI",
          body: "Tap to join the official channel",
          thumbnailUrl: "https://files.catbox.moe/q99uu1.jpg",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (err) {
    console.error("Menu error: ", err);
    repondre("Menu error: " + err);
  }
});
