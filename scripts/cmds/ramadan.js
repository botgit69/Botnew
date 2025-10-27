const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "ramadan",
    aliases: ["ramjan", "রমজান"],
    version: "1.0",
    author: "Tanvir",
    role: 0,
    shortDescription: "রমজান সম্পর্কিত তথ্য দেখাবে",
    longDescription: "২০২৬ সালের রমজান কখন শুরু হবে, কতদিন বাকি, ও ইসলামিক দোয়া পাঠাবে",
    category: "islamic",
    guide: {
      en: "{pn} অথবা /ramadan লিখলে রমজান সম্পর্কিত তথ্য জানাবে"
    }
  },

  onStart: async function ({ message }) {
    const startRamadan = moment.tz("2026-02-18", "Asia/Dhaka");
    const today = moment.tz("Asia/Dhaka");
    const diffDays = startRamadan.diff(today, "days");

    let reply = "";
    if (diffDays > 0) {
      reply = `🌙 **রমজান ২০২৬** 🌙  
🗓 রমজান শুরু হওয়ার সম্ভাব্য তারিখ: **১৮ ফেব্রুয়ারি ২০২৬**  
📆 রমজান শুরু হতে বাকি আছে: **${diffDays} দিন**

🤲 ইসলামিক দোয়া:  
اللهم بلغنا رمضان  
**বাংলা উচ্চারণ:** আল্লাহুম্মা বাল্লিগনা রমাদান  
**অর্থ:** হে আল্লাহ! আমাদেরকে রমজান পর্যন্ত পৌঁছে দিন।

💫 রমজান মাসের গুরুত্ব:  
রমজান মাস হলো রহমত, মাগফিরাত ও নাজাতের মাস। এই মাসে রোজা রাখা, নামাজ, কুরআন তেলাওয়াত ও দান-সদকা করলে আল্লাহ তায়ালা অসীম পুরস্কার দান করেন।`;
    } else if (diffDays === 0) {
      reply = `🌙 আজই পবিত্র রমজান শুরু!  
আলহামদুলিল্লাহ 🤲  
রমজানের প্রথম সেহরির সময় মনে রাখুন, ইবাদতে মনোযোগ দিন এবং বেশি বেশি দোয়া করুন।`;
    } else {
      reply = `🌙 পবিত্র রমজান ২০২৬ ইতোমধ্যেই শেষ হয়েছে।  
🕊 আল্লাহ তায়ালা আমাদের রোজা ও আমল কবুল করুন, আমিন 🤲`;
    }

    message.reply(reply);
  }
};
