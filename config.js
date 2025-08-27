const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUhhSGo0VFQ5UEtVTXcrS002MWs3NEp4cjByQ2RacnRMbURPVTRqREhXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFh6TmVxc0RkakVjSnFXRkVTSTh3U1dvcWh4WURhSnN0S1FkTDZSZVFFVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjTGRxMUhpRFN3K2RNclAzbDdocnR4NzVnNkZhc0lzSTZmVnNOb0g4ZUc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEekdxVjJBWVpzYUFMaW9xdzF5QWw3ZjExUXpDY3hISUhSNFVMSFJjZW1nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVJRzhhY2lFa2xsOSszV0RETkh0d0hxU2REVVhFUWVSUk8wOVBUa2RvWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJVZWFneE4vTTArQzJuRDBsMm5odFBlbUw0MU1GSDZnM0RGN0VFWXRzUTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid093enBaR1hFSTcxZnFPcUppU3dJZzRnaFl5aHZLZ0Y2TkVySUN6MFMwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczZoOThjRDc2Q3VZTXdmaUJsaksreHJjRTdDZDdQWGdYREh2bnVVTzZobz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFmOEZoUGtXRFFXQ1JjM1pSanBwd3Axb1RWWTc0dERsMm9Md3pVOWZ2bVlpZUZlU2ZBMFVXc0Uxd1IyTHV2OUdmTDhXTVdERndaSmJnem4zOUZBMWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6Im80VWZWOEptb2k2MHBROGxROGczQ0M4aS9lb1NNT283QTRwNlBIeWRucTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQyMjE5NTMxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFM0U5QTlGMTA1MTZFNEM1Q0UyMjk5NTJCOEFERTdEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTYzMDg3MDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0MjIxOTUzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5QTIwQzE5NjVEMDVERTI3NkIwOTBDMDQ0OEQ4NUU0QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2MzA4NzEwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NDIyMTk1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTc2NDIxN0Q1NjFBNTA0MTI0NTk0Q0Y3MENCOTc4MzAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NjMwODcxNX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUlZDSDc2TEwiLCJtZSI6eyJpZCI6IjI1NDc0MjIxOTUzMTo1N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE0ODMwNTUzOTUzODk3Nzo1N0BsaWQiLCJuYW1lIjoiVGh1aXRhIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQYmZpZFFFRUx2SnZNVUdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5UTZ0VHM3T2FKNG1jSjVBeXhqWFJCWU9zM1lWdTJ4TTBTNGFTVkpQNkV3PSIsImFjY291bnRTaWduYXR1cmUiOiJURjhRZ1l1aHpXZHhzSUJsZnFKY0M3QWh4RDhJc1QvR2ZxNTVCd1J1Rnprb1pZSnF5NUFDSjh2ci9LR0o3Nnc5Mm5WSGx5dENUeUFESlA3VUFqS1FBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoic3dLcHN1bFplbGU0cDF6ZUpnYzM1SjZRYkk2cVhOem5RR3czUHZIbkJWOWJHakhPUFQyL0ZkWUZKQ1g0UVhVeld1ajFFT0NHUlRXSDhyR3JuejN0Z2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDIyMTk1MzE6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2tPclU3T3ptaWVKbkNlUU1zWTEwUVdEck4yRmJ0c1RORXVHa2xTVCtoTSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2MzA4NjgxLCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNuQiJ9",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
//; make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY NEXUS-AI 🤍*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
GOODBYE: process.env.GOODBYE || "false",
// true if want welcome and goodbye msg in groups       
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://i.postimg.cc/SR9S0ZdT/11900809-f4ad-46ee-bedf-f430eed4bab8.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "NEXUS-AI",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "NEXUS-AI",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "254742219531",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "officialPkdriller",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ pkdriller*",
// add bot owner name    
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.postimg.cc/SR9S0ZdT/11900809-f4ad-46ee-bedf-f430eed4bab8.jpg",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "> Zinda Hun Yar *NEXUS-AI*⚡",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "private",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "254794146821",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "true",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "true"
// make it true for auto recoding 
};
