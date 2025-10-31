const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 🧠 মেমরি সংরক্ষণের জন্য লোকাল JSON ফাইল
const memoryFile = path.join(__dirname, "chat_memory.json");

// মেমরি ফাইল থেকে আগের কথোপকথন লোড করা
function loadMemory() {
  if (!fs.existsSync(memoryFile)) return {};
  try {
    return JSON.parse(fs.readFileSync(memoryFile));
  } catch (err) {
    console.error("❌ Memory read error:", err);
    return {};
  }
}

// মেমরি সংরক্ষণ
function saveMemory(data) {
  try {
    fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Memory save error:", err);
  }
}

module.exports = {
  config: {
    name: "chatgpt",
    aliases: ["gpt", "ai", "talk"],
    author: "Tanu-Bruh",
    version: "3.0",
    shortDescription: { en: "ChatGPT with memory" },
    longDescription: {
      en: "একটা বুদ্ধিমান AI বট, যা আগের কথোপকথন মনে রাখে এবং মানুষের মতো ধারাবাহিকভাবে কথা বলে।",
    },
    category: "fun",
    guide: { en: "{p}chatgpt [message]" },
  },

  onStart: async function ({ api, event, args }) {
    const prompt = args.join(" ");
    if (!prompt)
      return api.sendMessage(
        "🧠 বলো বন্ধু, কী জানতে চাও?",
        event.threadID,
        event.messageID
      );

    api.setMessageReaction("🤔", event.messageID, () => {}, true);

    // 🔑 তোমার OpenAI API Key
    const apiKey = "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";

    // আগের মেমরি লোড করো
    const memory = loadMemory();

    // ইউজার অনুযায়ী মেমরি তৈরি
    if (!memory[event.senderID]) memory[event.senderID] = [];

    // সর্বোচ্চ 10টা বার্তা পর্যন্ত মেমরি রাখো (পুরনো ডিলিট হবে)
    if (memory[event.senderID].length > 10) memory[event.senderID].shift();

    // আগের কথোপকথন সংরক্ষণ
    memory[event.senderID].push({ role: "user", content: prompt });

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "তুমি একজন বন্ধুসুলভ, হাসিখুশি সহকারী।" },
            ...memory[event.senderID],
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const reply = response.data.choices[0].message.content.trim();
      api.sendMessage(reply, event.threadID, event.messageID);

      // AI-এর উত্তরও মেমরিতে রাখো
      memory[event.senderID].push({ role: "assistant", content: reply });
      saveMemory(memory);

      api.setMessageReaction("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error("AI Error:", error.response?.data || error.message);
      api.sendMessage(
        "⚠️ দুঃখিত বন্ধু, এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করো!",
        event.threadID,
        event.messageID
      );
      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  },
};
