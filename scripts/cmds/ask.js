const OpenAI = require("openai");
const { readFileSync } = require("fs");

module.exports = {
  config: {
    name: "ask",
    aliases: ["q", "question", "জিজ্ঞেস"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "knowledge",
    shortDescription: { en: "ChatGPT মতো প্রশ্নের উত্তর" },
    longDescription: { en: "প্রশ্ন অনুযায়ী ChatGPT থেকে উত্তর দেয়" },
    guide: { en: "{pn} <প্রশ্ন>" }
  },

  onStart: async function({ api, event, args }) {
    if (!args || args.length === 0) {
      return api.sendMessage("❌ দয়া করে একটি প্রশ্ন লিখো। উদাহরণ: /ask তুমি কেমন আছো?", event.threadID);
    }

    const question = args.join(" ");
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that answers in Bengali." },
          { role: "user", content: question }
        ],
        temperature: 0.7
      });

      const answer = response.choices[0].message.content;
      api.sendMessage(answer, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ OpenAI থেকে উত্তর পাওয়া যায়নি। API Key ঠিক আছে কিনা চেক করো।", event.threadID);
    }
  }
};
