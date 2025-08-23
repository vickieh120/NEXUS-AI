const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const os = require("os");
const fetch = require("node-fetch");

zokou(
  {
    nomCom: "repo",
    categorie: "Info",
    desc: "Show GitHub repository info",
    reaction: "📂",
  },
  async (jid, sock, ctx) => {
    const { repondre } = ctx;
    moment.tz.setDefault("Etc/GMT");
    const date = moment().format("DD/MM/YYYY");

    try {
      // Fetch GitHub repository data
      const response = await fetch(
        "https://api.github.com/repos/officialPkdriller/NEXUS-AI"
      );
      
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      
      const repoData = await response.json();
      const { stargazers_count: stars = 0, forks_count: forks = 0, description = "No description" } = repoData;

      const caption = `
╭───〔 📂 NEXUS-AI REPOSITORY 〕
│
├ 👤 Creator   : PK Driller
├ 📅 Date      : ${date}
├ 💻 Platform  : ${os.platform()}
├ ⭐ Stars     : ${stars}
├ 🍴 Forks     : ${forks}
├ 📝 About     : ${description}
│
├ 🔗 GitHub Repo : https://github.com/officialPkdriller/NEXUS-AI
├ 📢 Channel     : https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x
├ 👨‍💻 Owner      : wa.me/254794146821
│
╰───〔 🚀 Powered by Pkdriller | 2025 💎 〕
`;

      await sock.sendMessage(
        jid,
        {
          image: { 
            url: "https://i.postimg.cc/DfxsyWD7/d444fb03-b701-409d-822c-d48b9427eb93.jpg" 
          },
          caption: caption.trim(),
          contextInfo: {
            mentionedJid: [sock.user.id],
            forwardingScore: 999,
            isForwarded: true,
          },
        },
        { quoted: ctx }
      );
    } catch (error) {
      console.error("Error:", error);
      repondre("❌ Failed to fetch repository information");
    }
  }
);
