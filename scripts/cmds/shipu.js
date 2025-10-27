const axios = require("axios");

module.exports = {
  config: {
    name: "shipu",
    aliases: ["ai", "lum", "lumyai", "শিপু"],
    version: "3.0",
    author: "Tanu Bruh Mod by ChatGPT",
    countDown: 1,
    role: 0,
    shortDescription: {
      en: "Talk with ShiPu AI in different personality modes (বাংলা সহ)"
    },
    longDescription: {
      en: "Chat with ShiPu AI in normal, Islamic, funny, or romantic modes."
    },
    category: "ai",
    guide: {
      en: "{prefix}shipu [message]\n{prefix}shipu mode [islamic|funny|romantic|normal]\nExample: /shipu mode islamic"
    }
  },

  onStart: async function ({ api, event, args }) {
    const uid = event.senderID;
    const input = args.join(" ").trim();
    if (!input) return api.sendMessage("🧠 কিছু লিখো ভাই, আমি উত্তর দিবো!", event.threadID);

    // যদি mode সেট করতে চায়
    if (args[0]?.toLowerCase() === "mode") {
      const mode = args[1]?.toLowerCase();
      if (!["islamic", "funny", "romantic", "normal"].includes(mode))
        return api.sendMessage("⚙️ ব্যবহার: /shipu mode [islamic|funny|romantic|normal]", event.threadID);
      global.ShipuMode = global.ShipuMode || {};
      global.ShipuMode[uid] = mode;
      return api.sendMessage(`✅ মোড পরিবর্তন হয়েছে ➤ *${mode.toUpperCase()}*`, event.threadID);
    }

    await handleShipu(api, event, input);
  },

  onReply: async function ({ api, event }) {
    if (!event.body) return;
    await handleShipu(api, event, event.body);
  },

  onChat: async function ({ api, event }) {
    const body = event.body?.toLowerCase();
    if (!body) return;
    const prefixes = ["shipu", "ai", "lumyai", "lum", "শিপু"];
    const match = prefixes.find(p => body.startsWith(p));
    if (!match) return;
    const query = body.slice(match.length).trim();
    if (!query) return api.sendMessage("💬 বলো ভাই, শুনছি...", event.threadID);
    await handleShipu(api, event, query);
  }
};

// ───────────────────────────────
// মূল কথোপকথন হ্যান্ডলার
async function handleShipu(api, event, userInput) {
  try {
    const uid = event.senderID;
    const mode = global.ShipuMode?.[uid] || "normal";

    // Mode অনুযায়ী নির্দেশনা
    let prompt;
    switch (mode) {
      case "islamic":
        prompt = `তুমি একজন ইসলামিক উপদেষ্টা হিসেবে উত্তর দেবে। কুরআন-হাদীস অনুযায়ী নম্র ভাষায় উত্তর দাও। প্রশ্ন: ${userInput}`;
        break;
      case "funny":
        prompt = `তুমি একজন মজার চরিত্র, হালকা হাস্যরস মিশিয়ে উত্তর দাও। প্রশ্ন: ${userInput}`;
        break;
      case "romantic":
        prompt = `তুমি একজন ভালোবাসাপূর্ণ রোমান্টিক চরিত্র, নরম ও মিষ্টি ভঙ্গিতে উত্তর দাও। প্রশ্ন: ${userInput}`;
        break;
      default:
        prompt = userInput;
    }

    // API রিকোয়েস্ট
    const res = await axios.get(`https://api.bk9.site/api/chat?message=${encodeURIComponent(prompt)}`);
    const reply = res.data?.reply || "😅 আমি একটু বুঝতে পারিনি ভাই।";

    const styled = `╭───「 🤖 𝗦𝗵𝗶𝗣𝘂 𝗔𝗜 」───╮
👤 Mode: ${mode.toUpperCase()}
💬 Question: ${userInput}

🧠 Answer: ${reply}
╰────────────────────╯`;

    api.sendMessage(styled, event.threadID, (err, info) => {
      if (!info?.messageID) return;
      global.GoatBot.onReply.set(info.messageID, {
        commandName: "shipu",
        author: event.senderID,
        type: "reply"
      });
    }, event.messageID);
  } catch (err) {
    console.error(err);
    api.sendMessage("⚠️ সার্ভার ব্যস্ত! একটু পরে চেষ্টা করো ভাই।", event.threadID, event.messageID);
  }
}
