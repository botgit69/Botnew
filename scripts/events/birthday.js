const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "birthday_auto",
    version: "2.0",
    author: "Tanu Bruh",
    category: "events",
    description: "তানভীর ভাইয়ের জন্মদিনে (৩০ অক্টোবর) রাত ১২:০০ টায় অটো ইমোশনাল উইশ পাঠাবে ❤️"
  },

  onLoad: function ({ api }) {
    console.log("🎂 Birthday Auto Event Loaded Successfully!");

    // প্রতি ১ মিনিট পর সময় চেক করবে
    setInterval(async () => {
      try {
        const now = moment().tz("Asia/Dhaka");
        const day = now.date();
        const month = now.month() + 1;
        const hour = now.hour();
        const minute = now.minute();

        // ৩০ অক্টোবর রাত ১২:০০ টা
        if (day === 30 && month === 10 && hour === 0 && minute < 2) {
          const message = `
🎉🎂✨ *শুভ জন্মদিন তানভীর ভাই!* ✨🎂🎉

💖 আজকের দিনটি আপনার জন্য আল্লাহর রহমত, আনন্দ এবং ভালোবাসায় ভরে উঠুক।  
🕊️ বন্ধুবান্ধব সবার থেকে হাজার মাইল দূরে, তবু কেউ উইশ না করলেও আমি করলাম ❤️  
📌 @MD Tanvir Ahmmed Chowdhury

💔 জানি, কখনো কখনো মানুষ আমাদের দূরত্বে ভাঙে, মনটা কষ্টে ভরে যায়।  
🌟 কিন্তু আজকের দিনে, এই ক্ষুদ্র বার্তায় আমার ভালোবাসা এবং আন্তরিকতা আপনার কাছে পৌঁছে।  

🎁 আজকের দিনটি উদযাপন করুন, হাসুন, আনন্দ করুন।  
🤲 আল্লাহ আপনার জীবনকে সুখ, শান্তি, আশা এবং নেক আমল দিয়ে ভরে দিন।  
✨ আপনি কখনো একা নন, আমি সবসময় আপনার সাথে আছি এই মেসেজের মাধ্যমে।  

💌 আবারও শুভ জন্মদিন, তানভীর ভাই! 🎉💖🎂  
🌏 পৃথিবীর যে প্রান্তে থাকো মায়ের ভালোবাসা থেকে বঞ্চিত হবেনা,  
আর ওই মা-ই কিন্তু তোমাকে প্রথম উইশ করেছে 😅  
👉 তোমার ইমু চেক করো ভাই 😄
`;

          console.log("⏰ It's birthday time! Sending wishes to all threads...");

          const threads = await api.getThreadList(100, null, ["INBOX"]);
          for (const thread of threads) {
            await new Promise(res => setTimeout(res, 2000)); // delay 2 sec প্রতি থ্রেডে
            api.sendMessage(message, thread.threadID, (err) => {
              if (err) console.error("❌ Send failed to:", thread.threadID);
            });
          }

          console.log("✅ Birthday message sent successfully to all groups!");
        }
      } catch (err) {
        console.error("💥 Birthday Event Error:", err);
      }
    }, 60 * 1000); // প্রতি ১ মিনিটে চেক করবে
  }
};
