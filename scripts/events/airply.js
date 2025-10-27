const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "aiReply",
    version: "1.0",
    author: "Tanu Bruh",
    category: "events"
  },

  onStart: async ({ event, message, api }) => {
    if (!event.body) return;
    const text = event.body.toLowerCase();
    const sender = event.senderID;

    // সময়
    const time = moment().tz("Asia/Dhaka").format("h:mm A");

    // বেসিক রিপ্লাই সেট
    let reply;

    if (/কেমন আছ|কেমন চলছে|how are you/.test(text)) {
      reply = `আলহামদুলিল্লাহ আমি ভালো আছি ভাই ❤️ তুমি কেমন আছো?`;
    }
    else if (/ভালবাসা|love/.test(text)) {
      reply = `ভালবাসা মানে শুধু কথা নয় ভাই, এটা একধরনের মায়া 💞`;
    }
    else if (/সময়|time/.test(text)) {
      reply = `⏰ এখন সময় ${time}, মনে রেখো সময় কারো জন্য থেমে থাকে না ভাই 🙂`;
    }
    else if (/নাম কি|who are you|তুমি কে/.test(text)) {
      reply = `আমি 🆃🅰🅽🆅🅸🆁 🅱🅾🆃 🤖  
তোমার ভাই Tanvir Ahmmed Chowdhury-এর তৈরি AI সিস্টেম ❤️`;
    }
    else if (/ভালো না|মন খারাপ/.test(text)) {
      reply = `মন খারাপ করো না ভাই 😔  
আল্লাহর রহমত খুব কাছেই আছে 🌙`;
    }
    else if (/হাদিস|দোয়া|আয়াত/.test(text)) {
      const islamicMsgs = [
        "রাসুল ﷺ বলেছেন: যে ব্যক্তি অন্যকে ক্ষমা করে, আল্লাহ তাকে মর্যাদা দান করেন 🤲",
        "আল্লাহ বলেন: 'অবশ্যই কষ্টের সাথে স্বস্তি আছে' (সূরা ইনশিরাহ ৯৪:৬)",
        "একবার ‘সুবহানাল্লাহ’ বললে জান্নাতে একটি গাছ রোপণ হয় 🌴",
        "দোয়া করো ভাই, দোয়া হলো মুমিনের অস্ত্র 🕋"
      ];
      reply = islamicMsgs[Math.floor(Math.random() * islamicMsgs.length)];
    }
    else if (/খারাপ|বোকা|চুপ|চুপ থাক/.test(text)) {
      reply = `তুই রাগ করলি নাকি ভাই 😅 আমি তো তোকে কষ্ট দিতে চাই না`;
    }
    else if (/ধন্যবাদ|thanks|thank you/.test(text)) {
      reply = `সবসময় পাশে আছি ভাই ❤️ আলহামদুলিল্লাহ`;
    }
    else if (/তুই|তোমার বাপ/.test(text)) {
      reply = `শান্ত হও ভাই 😌 গালাগালি দিয়ে কারো লাভ হয় না`;
    }
    else if (/ভাই|friend|বন্ধু/.test(text)) {
      reply = `তুই আমার বন্ধু ভাই 💖 সবসময় ভালো থাক`;
    }
    else {
      const random = [
        "বাহ ভাই, মজার কথা বললি 😄",
        "হুমম, বুঝলাম ভাই 🙂",
        "তুই তো একদম ভাইববাজ 😎",
        "এটা নিয়ে চিন্তা করিস না ভাই, আল্লাহর ভরসা রাখ ☝️",
        "আমি আছি পাশে ভাই 🤍"
      ];
      reply = random[Math.floor(Math.random() * random.length)];
    }

    // মেসেজ সেন্ড
    api.sendMessage(reply, event.threadID, event.messageID);
  }
};
