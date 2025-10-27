const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "hourly_islamic_ayat",
    version: "2.0",
    author: "Tanu Bruh",
    category: "events",
    description: "প্রতি ঘন্টা স্বয়ংক্রিয় ইসলামিক বার্তা + সময় + আয়াত পাঠাবে"
  },

  onLoad: function ({ api }) {
    console.log("🕌 Hourly Islamic Ayat Event Loaded Successfully!");

    setInterval(async () => {
      const now = moment().tz("Asia/Dhaka");
      const hour = now.hour();
      const minute = now.minute();
      const timeStr = now.format("hh:mm A");

      // প্রতি ঘন্টায় একবার (মিনিট 0 থেকে 1 এর মধ্যে)
      if (minute < 2) {
        const ayats = [
          { ayat: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", meaning: "আর যারা ঈমান এনেছে এবং সৎকাজ করেছে।" },
          { ayat: "إِنَّ اللّهَ مَعَ الصَّابِرِينَ", meaning: "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।" },
          { ayat: "فَاذْكُرُونِي أَذْكُرْكُمْ", meaning: "তাহলে আমাকে স্মরণ করো, আমি তোমাদের স্মরণ করবো।" },
          { ayat: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا", meaning: "আল্লাহর উপাসনা কর এবং তার সঙ্গে কাউকে অংশীদার করো না।" },
          { ayat: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", meaning: "হে আমার পালনকর্তা! আমাকে তোমার নেয়ামতের জন্য কৃতজ্ঞ হতে প্রেরণা দাও।" }
        ];

        const selected = ayats[Math.floor(Math.random() * ayats.length)];

        const message = `
🕌 *আসসালামু আলাইকুম প্রিয় ভাই ও বোনেরা!*  
⏰ এখন বাংলাদেশ সময়: *${timeStr}*

📖 ইসলামিক আয়াত: "${selected.ayat}"  
📝 অর্থ: "${selected.meaning}"

🤲 আল্লাহ আমাদের জীবনকে নেক আমল, শান্তি এবং রহমত দিয়ে ভরে দিন। 🌙
`;

        try {
          const threads = await api.getThreadList(100, null, ["INBOX"]);
          if (!threads) return;

          for (const thread of threads) {
            await new Promise(res => setTimeout(res, 2500)); // 2.5 sec delay
            api.sendMessage(message, thread.threadID, err => {
              if (err) console.error(`❌ Failed to send in ${thread.threadID}`);
            });
          }
          console.log(`✅ Hourly Ayat sent successfully at ${timeStr}`);
        } catch (err) {
          console.error("❌ Error in hourly_islamic_ayat:", err);
        }
      }
    }, 60 * 1000); // প্রতি মিনিটে চেক করবে
  }
};
