const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ginfo",
    alias: ["groupinfo"],
    use: '.ginfo',
    desc: "Show group information",
    category: "group",
    react: "ℹ️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply, groupMetadata }) => {
    try {
        if (!m.isGroup) return reply("❌ Group-only command!");

        const metadata = await groupMetadata(from);
        const admin = metadata.participants.find(p => p.admin === "superadmin")?.id || sender;

        const infoMsg = `
ℹ️ *Group Info*
────────────────────
🔖 *Name:* ${metadata.subject}
👥 *Members:* ${metadata.participants.length}
👑 *Admin:* @${admin.split('@')[0]}
📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleDateString()}
────────────────────
💬 *ID:* ${from}
        `.trim();

        await conn.sendMessage(from, {
            text: infoMsg,
            mentions: [admin],
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: "pk-tech",
                    serverMessageId: 146
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Ginfo error:", e);
        reply(`❌ Failed to fetch group info: ${e.message}`);
    }
});
