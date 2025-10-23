const axios = require("axios");
const fs = require("fs");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "jumma_auto",
    version: "1.0",
    author: "TanvirGPT",
    category: "events"
  },

  onLoad: function ({ api }) {
    console.log("🕌 Jumma Auto Event Loaded Successfully!");

    // প্রতি ১ ঘণ্টায় চেক করবে শুক্রবার সকাল ১১টা কিনা
    setInterval(async () => {
      const now = moment().tz("Asia/Dhaka");
      const day = now.format("dddd");
      const hour = now.hour();
      const minute = now.minute();

      // শুক্রবার সকাল ১১:০০ টায় ট্রিগার হবে
      if (day === "Friday" && hour === 11 && minute === 0) {
        console.log("🕚 Sending Jumma Mubarak messages to all threads...");

        try {
          const threads = await api.getThreadList(100, null, ["INBOX"]);

          for (const thread of threads) {
            await sendJummaMessage(api, thread.threadID);
            await new Promise(resolve => setTimeout(resolve, 2000)); // delay to prevent spam
          }
        } catch (err) {
          console.error("❌ Error sending Jumma messages:", err);
        }
      }
    }, 60 * 1000); // প্রতি মিনিটে চেক করবে
  }
};

async function sendJummaMessage(api, threadID) {
  const message = `
🌙✨ *জুম্মা মুবারক!*
আল্লাহ তায়ালা যেন এই পবিত্র দিনে তোমার জীবনকে নূরের আলোয় ভরিয়ে দেন 🤲
🕌 "হে মুমিনগণ! যখন জুমার আজান দেওয়া হয়, তখন আল্লাহর স্মরণে ছুটে যাও।" (সূরা আল-জুমু'আ: ৯)
🌸 দোয়া করি, আল্লাহ তোমার সব দুঃখ দূর করে দিক। 💚
`;

  const imageUrl = "https://i.postimg.cc/KvKwnD3N/Jumma-Mubarak.jpg";
  const path = __dirname + "/jumma.jpg";

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(path, Buffer.from(response.data, "binary"));

    api.sendMessage(
      {
        body: message,
        attachment: fs.createReadStream(path)
      },
      threadID,
      () => fs.unlinkSync(path)
    );
  } catch (e) {
    api.sendMessage(message, threadID);
  }
}
