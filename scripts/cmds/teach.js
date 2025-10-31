const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "teach",
    aliases: ["learn", "addteach"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "education",
    shortDescription: { en: "Teach the bot something new" },
    longDescription: { en: "Allows users to teach the bot new phrases or information" },
    guide: { en: "{pn} <something to teach>" }
  },

  onStart: async function({ api, event, args }) {
    const userInput = args.join(" ");
    if (!userInput) return api.sendMessage("❌ Please provide something to teach me!", event.threadID);

    const teachFilePath = path.join(__dirname, "teach_data.json");

    let teachData = {};
    if (fs.existsSync(teachFilePath)) {
      teachData = JSON.parse(fs.readFileSync(teachFilePath, "utf-8"));
    }

    // Save the new info with userID as key (overwrite if same user teaches again)
    teachData[event.senderID] = userInput;

    fs.writeFileSync(teachFilePath, JSON.stringify(teachData, null, 2), "utf-8");

    api.sendMessage(`✅ Got it! I've learned: "${userInput}"`, event.threadID);
  }
};
