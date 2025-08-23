const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

// Helper function for uptime formatting
function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

// Current time/date function
moment.tz.setDefault(`${conf.TZ}`);
const getTimeAndDate = () => {
  return {
    time: moment().format("HH:mm:ss"),
    date: moment().format("DD/MM/YYYY"),
  };
};

// =============== UPTIME ===============
zokou({ nomCom: "uptime", categorie: "General" }, async (jid, sock, ctx) => {
  let { ms } = ctx;
  const uptime = formatUptime(process.uptime());
  const { time, date } = getTimeAndDate();

  const msg = `
╭━━━〔 ⏳ BOT UPTIME 〕━━━◆
┃ 📅 Date     : ${date}
┃ 🕒 Time     : ${time}
┃ ⚡ Uptime   : ${uptime}
┃ 💻 System   : ${os.platform()}
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  await sock.sendMessage(jid, { text: msg }, { quoted: ms });
});

// =============== PING ===============
zokou({ nomCom: "ping", categorie: "General" }, async (jid, sock, ctx) => {
  let { ms } = ctx;
  const start = new Date().getTime();
  const end = new Date().getTime();
  const speed = end - start;

  const msg = `
╭━━━〔 🏓 PING TEST 〕━━━◆
┃ ⚡ Response : ${speed}ms
┃ 📡 Status   : Stable ✅
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  await sock.sendMessage(jid, { text: msg }, { quoted: ms });
});

// =============== ALIVE ===============
zokou({ nomCom: "alive", categorie: "General" }, async (jid, sock, ctx) => {
  let { ms } = ctx;
  const { time, date } = getTimeAndDate();
  const uptime = formatUptime(process.uptime());

  const msg = `
╭━━━〔 🤖 BOT STATUS 〕━━━◆
┃ ✅ Nexus-AI is *Alive!*
┃ 📅 Date   : ${date}
┃ 🕒 Time   : ${time}
┃ ⚡ Uptime : ${uptime}
┃ 💻 Server : ${os.hostname()}
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  await sock.sendMessage(jid, { text: msg }, { quoted: ms });
});

// =============== TEST ===============
zokou({ nomCom: "test", categorie: "General" }, async (jid, sock, ctx) => {
  let { ms } = ctx;

  const msg = `
╭━━━〔 🧪 SYSTEM TEST 〕━━━◆
┃ ✅ Test successful!
┃ 🚀 Nexus-AI is running fine.
╰━━━━━━━━━━━━━━━━━━━━━━━◆
`;

  await sock.sendMessage(jid, { text: msg }, { quoted: ms });
});
