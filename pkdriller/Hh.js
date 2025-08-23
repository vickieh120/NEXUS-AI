const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const os = require("os");
const fetch = require("node-fetch");

zokou({
  nomCom: "repo",
  categorie: "Info"
}, async (jid, sock, ctx) => {
  let { repondre } = ctx;

  // Date & meta
  moment.tz.setDefault("Etc/GMT");
  const date = moment().format("DD/MM/YYYY");

  // GitHub repo data
  let stars = 0, forks = 0, desc = "No description";
  try {
    const res = await fetch("https://api.github.com/repos/officialPkdriller/NEXUS-AI", {
      headers: { "Accept": "application/vnd.github+json" }
    });
    if (res.ok) {
      const json = await res.json();
      stars = json.stargazers_count || 0;
      forks = json.forks_count || 0;
      desc = json.description || "No description provided";
    } else {
      console.error("GitHub API error:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }

  // Caption
  const caption = `
╭━━━〔 ✦ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈 𝐑𝐄𝐏𝐎 ✦ 〕━━━◆
┃ 👤 *Creator*   : PK Driller
┃ 📅 *Date*      : ${date}
┃ 💻 *Platform*  : ${os.platform()}
┃ ⭐ *Stars*     : ${stars}
┃ 🍴 *Forks*     : ${forks}
┃ 📝 *About*     : ${desc}
╰━━━━━━━━━━━━━━━━━━━━━━━◆

🔗 *GitHub Repo* : https://github.com/officialPkdriller/NEXUS-AI
📢 *Channel*     : https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x
👨‍💻 *Owner*      : wa.me/254794146821

🚀 Powered by *Pkdriller* | 2025💎
`;

  try {
    await sock.sendMessage(jid, {
      image: { url: "https://i.postimg.cc/DfxsyWD7/d444fb03-b701-409d-822c-d48b9427eb93.jpg" },
      caption,
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
    console.error("Repo error:", err);
    repondre("Repo error: " + err);
  }
});
