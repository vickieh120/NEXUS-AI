const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

moment.tz.setDefault(conf.TZ);

zokou({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms } = commandeOptions;

  try {
    const start = Date.now();
    await zk.sendMessage(dest, { text: "🏓 Pinging..." });
    const end = Date.now();

    const ping = end - start;
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");
    const uptime = os.uptime();

    let msg = `╭─❏ *📡 PK-XMD PING*\n` +
              `│\n` +
              `│ ⏱️ Response: *${ping}ms*\n` +
              `│ 📆 Date: *${date}*\n` +
              `│ 🕒 Time: *${time}*\n` +
              `│ ⚡ Uptime: *${Math.floor(uptime/3600)}h ${Math.floor((uptime%3600)/60)}m*\n` +
              `│\n` +
              `╰───────────────❏`;

    await zk.sendMessage(dest, {
      text: msg,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363288304618280@newsletter",
          newsletterName: "NEXUS-AI",
          serverMessageId: 143
        },
        externalAdReply: {
          title: "⚡ PK-XMD SYSTEM STATUS",
          body: "Bot is running smoothly 🚀",
          thumbnailUrl: conf.LOGO, // use your logo in set.js
          sourceUrl: conf.GURL,
          mediaType: 1
        }
      }
    }, { quoted: ms });

  } catch (e) {
    console.log("❌ Ping Command Error:", e);
    await zk.sendMessage(dest, { text: `❌ Error: ${e}` }, { quoted: ms });
  }
});
