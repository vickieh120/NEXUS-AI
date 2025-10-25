'use strict';

Object.defineProperty(exports, "__esModule", { 'value': true });

const { zokou } = require("../framework/zokou");
const axios = require("axios");

const newsletterContext = {
  contextInfo: {
    forwardingScore: 0x3e7,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "𝐍𝐄𝐗𝐔𝐒-𝐀𝐈",
      serverMessageId: 0x1
    }
  }
};

zokou({
  nomCom: "repo",
  categorie: "General",
  reaction: "🟢",
  nomFichier: __filename
}, async (jid, sock, ctx) => {
  const REPO_API = "https://api.github.com/repos/officialPkdriller/NEXUS-AI";
  const REPO_URL = "https://github.com/officialPkdriller/NEXUS-AI";
  const BANNER = "https://files.catbox.moe/bx4dii.jpg";
  const AUDIO = "https://files.catbox.moe/bcmkyc.mp3";

  try {
    const { data } = await axios.get(REPO_API, {
      headers: {
        "Accept": "application/vnd.github+json",
        "User-Agent": "PK-XMD-Bot"
      },
      timeout: 10000
    });

    const stars = data?.stargazers_count ?? 0;
    const forks = data?.forks_count ?? 0;
    const issues = data?.open_issues_count ?? 0;
    const watchers = data?.watchers_count ?? 0;
    const created = data?.created_at ? new Date(data.created_at).toLocaleDateString("en-GB") : "N/A";
    const updated = data?.updated_at ? new Date(data.updated_at).toLocaleString("en-GB") : "N/A";
    const owner = data?.owner?.login ?? "Pkdriller";

    const caption =
`*𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*

_________● *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈* ●____________
| 💥 *ʀᴇᴘᴏsɪᴛᴏʀʏ:* ${REPO_URL}
| 🌟 *sᴛᴀʀs:* ${stars}
| 🍽 *ғᴏʀᴋs:* ${forks}
| 🐛 *ɪssᴜᴇs:* ${issues}
| 👁 *ᴡᴀᴛᴄʜᴇʀs:* ${watchers}
| 📅 *ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ:* ${created}
| 🔄 *ᴜᴘᴅᴀᴛᴇ ᴏɴ:* ${updated}
| 👨‍💻 *ᴏᴡɴᴇʀ:* ${owner}
| 💞 *ᴛʜᴇᴍᴇ:* *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*
| 🥰 *ᴏɴʟʏ ɢᴏᴅ ᴄᴀɴ ᴊᴜᴅɢᴇ ᴍᴇ!👑*
__________________________________
            *ᴍᴀᴅᴇ ᴡɪᴛʜ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*`;

    await sock.sendMessage(jid, {
      image: { url: BANNER },
      caption,
      ...newsletterContext
    });

    await sock.sendMessage(jid, {
      audio: { url: AUDIO },
      mimetype: "audio/mp4",
      ptt: false,
      ...newsletterContext
    });

  } catch (err) {
    console.log("Repo fetch failed:", err?.response?.status || err?.message || err);

    // Graceful fallback: still send your banner + static repo link (no scary error for users)
    const fallbackCaption =
`*𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*

_________● *𝐍𝐄𝐗𝐔𝐒-𝐀𝐈* ●____________
| 💥 *ʀᴇᴘᴏsɪᴛᴏʀʏ:* ${REPO_URL}
| ⚠️ *ʟɪᴠᴇ sᴛᴀᴛs:* ᴜɴᴀᴠᴀɪʟᴀʙʟᴇ ᴍᴏᴍᴇɴᴛᴀʀɪʟʏ
__________________________________
            *ᴍᴀᴅᴇ ᴡɪᴛʜ 𝐍𝐄𝐗𝐔𝐒-𝐀𝐈*`;

    await sock.sendMessage(jid, {
      image: { url: "https://files.catbox.moe/bx4dii.jpg" },
      caption: fallbackCaption,
      ...newsletterContext
    });

    await sock.sendMessage(jid, {
      audio: { url: "https://files.catbox.moe/bcmkyc.mp3" },
      mimetype: "audio/mp4",
      ptt: false,
      ...newsletterContext
    });
  }
});
