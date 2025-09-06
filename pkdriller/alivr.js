const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

moment.tz.setDefault(conf.TZ);

zokou({ nomCom: "test", categorie: "General" }, async (dest, zk, commandeOptions) => {
  const { ms } = commandeOptions;

  try {
    const start = Date.now();
    await zk.sendMessage(dest, { text: "⚡ Running test..." });
    const end = Date.now();

    const ping = end - start;
    const time = moment().format("HH:mm:ss");
    const date = moment().format("DD/MM/YYYY");

    let msg = `╭─❏ *🛠️ NEXUS-AI TEST*\n` +
              `│\n` +
              `│ 📡 Ping: *${ping}ms*\n` +
              `│ 📆 Date: *${date}*\n` +
              `│ 🕒 Time: *${time}*\n` +
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
          title: "🛠️ System Test",
          body: "Everything is working ✅",
          thumbnailUrl: conf.LOGO,
          sourceUrl: conf.GURL,
          mediaType: 1
        }
      }
    }, { quoted: ms });

  } catch (e) {
    console.log("❌ Test Command Error:", e);
    await zk.sendMessage(dest, { text: `❌ Error: ${e}` }, { quoted: ms });
  }
});
