const { zokou } = require("../framework/zokou");
const fetch = require("node-fetch");
const moment = require("moment-timezone");
const conf = require("../set");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "𝐍𝐄𝐗𝐔𝐒-𝐀𝐈",
      serverMessageId: 1
    },
    externalAdReply: {
      title: "📦 NEXUS-AI GitHub Repository",
      body: "Powered by Pkdriller 💙",
      thumbnailUrl: conf.LOGO,
      sourceUrl: "https://github.com/officialPkdriller/NEXUS-AI",
      mediaType: 1
    }
  }
};

zokou({
  nomCom: "repo",
  categorie: "General",
  reaction: "🟢",
  nomFichier: __filename
}, async (dest, zk, ctx) => {
  try {
    const response = await fetch("https://api.github.com/repos/officialPkdriller/NEXUS-AI");
    const data = await response.json();

    if (!data || data.message === "Not Found") {
      return await zk.sendMessage(dest, { text: "❌ Repository not found!" }, { quoted: ctx.ms });
    }

    const createdAt = new Date(data.created_at).toLocaleDateString("en-GB");
    const updatedAt = new Date(data.updated_at).toLocaleDateString("en-GB");

    const caption = 
`╭─❏ *📦 NEXUS-AI REPOSITORY*
│
│ 🔗 *URL:* ${data.html_url}
│ ⭐ Stars: ${data.stargazers_count}
│ 🍴 Forks: ${data.forks_count}
│ 🐛 Issues: ${data.open_issues_count}
│ 👁 Watchers: ${data.watchers_count}
│ 🕒 Created: ${createdAt}
│ 🔄 Updated: ${updatedAt}
│ 👨‍💻 Owner: ${data.owner.login}
│
╰───────────────❏
*Made with ❤️ by Pkdriller*`;

    await zk.sendMessage(dest, {
      image: { url: "https://files.catbox.moe/bx4dii.jpg" }, // your repo image
      caption,
      ...newsletterContext
    });

  } catch (err) {
    console.log("❌ Repo Command Error:", err);
    await zk.sendMessage(dest, { text: "⚠️ Failed to fetch repository details." }, { quoted: ctx.ms });
  }
});
