async function searchYouTube(query) {
    // Use yt-search or your preferred method
}

async function downloadFromApis(apis) {
    for (let api of apis) {
        try {
            const res = await fetch(api).then(r => r.json());
            if (res && res.result && res.result.download_url) return res;
        } catch {}
    }
    throw new Error("All APIs failed.");
}

function getContextInfo(title, user, thumbnail) {
    return {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
            mediaUrl: thumbnail,
            mediaType: 2,
            title: "PK-TECH CHANNEL",
            body: title,
            thumbnail: Buffer.from(await (await fetch(thumbnail)).arrayBuffer())
        }
    };
}
