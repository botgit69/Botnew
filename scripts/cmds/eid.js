const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "eid",
    version: "1.0",
    author: "Tanvir",
    category: "islamic",
    shortDescription: "ঈদুল ফিতর ও ঈদুল আযহার তারিখ ও কতোদিন বাকি দেখায়",
    longDescription:
      "২০২৬ সালের ঈদুল ফিতর ও ঈদুল আযহার নির্ধারিত আনুমানিক তারিখ দেখাবে এবং কতোদিন বাকি আছে সেটা জানাবে।",
    guide: "{p}eid"
  },

  onStart: async function ({ api, event }) {
    // বাংলাদেশ সময় অনুযায়ী
    const today = moment().tz("Asia/Dhaka");

    // ২০২৬ সালের আনুমানিক ইসলামিক ক্যালেন্ডার অনুযায়ী
    const eidUlFitr = moment.tz("2026-03-19", "Asia/Dhaka");  // আনুমানিক ১ শাওয়াল
    const eidUlAdha = moment.tz("2026-06-27", "Asia/Dhaka");  // আনুমানিক ১০ জিলহজ্জ

    // আজকের তারিখ থেকে পার্থক্য
    const daysToFitr = eidUlFitr.diff(today, "days");
    const daysToAdha = eidUlAdha.diff(today, "days");

    // বাংলা বার্তা তৈরি
    let message = "🕌 **ইসলামিক তথ্য (২০২৬)** 🕌\n\n";

    // ঈদুল ফিতর
    if (daysToFitr > 0) {
      message += `🌙 ঈদুল ফিতর ইনশাআল্লাহ পড়বে ${eidUlFitr.format("DD MMMM, YYYY")} তারিখে।\n📅 এখনো বাকি আছে ${daysToFitr} দিন।\n`;
    } else if (daysToFitr === 0) {
      message += "✨ আজ ঈদুল ফিতর! ঈদের শুভেচ্ছা গ্রহণ করুন! 🌙\n";
    } else {
      message += `🌙 ঈদুল ফিতর (${eidUlFitr.format("DD MMMM, YYYY")}) ইতিমধ্যে পেরিয়ে গেছে।\n`;
    }

    message += "\n";

    // ঈদুল আযহা
    if (daysToAdha > 0) {
      message += `🕋 ঈদুল আযহা ইনশাআল্লাহ পড়বে ${eidUlAdha.format("DD MMMM, YYYY")} তারিখে।\n📅 এখনো বাকি আছে ${daysToAdha} দিন।\n`;
    } else if (daysToAdha === 0) {
      message += "🕋 আজ ঈদুল আযহা! কুরবানির ঈদের শুভেচ্ছা! 🤲\n";
    } else {
      message += `🕋 ঈদুল আযহা (${eidUlAdha.format("DD MMMM, YYYY")}) ইতিমধ্যে পেরিয়ে গেছে।\n`;
    }

    message += "\n🤍 আল্লাহ্‌ আমাদের রোযা ও কুরবানী কবুল করুন।\n— _MD Tanvir Ahmmed Chowdhury Bot_ 🤍";

    // বার্তা পাঠানো
    return api.sendMessage(message, event.threadID, event.messageID);
  }
};
