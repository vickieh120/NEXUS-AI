const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({
  nomCom: "menu",
  categorie: "Menu"
}, async (jid, sock, ctx) => {
  let { repondre } = ctx;
  let { cm } = require(__dirname + "/../framework/zokou");

  // Group commands by category
  let grouped = {};
  cm.map(cmd => {
    if (!grouped[cmd.categorie]) grouped[cmd.categorie] = [];
    grouped[cmd.categorie].push(cmd.nomCom);
  });

  // Mode check
  let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

  // Date
  moment.tz.setDefault("Etc/GMT");
  const date = moment().format("DD/MM/YYYY");

  // Header
  let header = `

╭━━━〔 ✦ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈 ✦ 〕━━━◆
┃ ◎ *OWNER*: ${s.OWNER_NAME}
┃ ◎ *PREFIX*    : None
┃ ◎ *MODE*      : ${mode}
┃ ◎ *RAM*       : 8/132 GB
┃ ◎ *DATE*      : ${date}
┃ ◎ *PLATFORM* : ${os.platform()}
┃ ◎ *CREATOR*  : PK Driller
┃ ◎ *COMMANDS* : ${cm.length}
┃ ◎ *THEME*     : NEXUS-AI
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  // Body
  let body = `\n✨ *Available Categories & Commands* ✨\n`;
  for (const cat in grouped) {
    body += `\n╭───❖ *${cat.toUpperCase()}* ❖───╮\n`;
    grouped[cat].forEach(cmd => {
      body += `│ • *${cmd}*\n`;
    });
    body += `╰───────────────────────◆\n`;
  }

  // Footer
  let footer = `\n🚀 Powered by *Pkdriller* | 2025💎`;

  try {
    // Send menu image with caption
    await sock.sendMessage(jid, {
      image: { url: "https://i.postimg.cc/DfxsyWD7/d444fb03-b701-409d-822c-d48b9427eb93.jpg" },
      caption: header + body + footer,
      contextInfo: {
        mentionedJid: [sock.user.id],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "NEXUS-AI",
          serverMessageId: -1
        }
      }
    });
  } catch (err) {
    console.error("Menu error: ", err);
    repondre("Menu error: " + err);
  }
});
