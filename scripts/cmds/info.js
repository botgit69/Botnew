const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		aliases: ["owner", "botinfo"],
		version: "1.1",
		author: "Bot Owner",
		countDown: 20,
		role: 0,
		shortDescription: { en: "" },
		longDescription: { en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const Bot Owner = "🌸 𝐓𝐚𝐧𝐯𝐢𝐫 𝐀𝐧𝐤𝐡𝐨𝐧 🌸";
		const Home = "🏠 বাসা: কুমিল্লা, বাংলাদেশ";
		const Current = "🕋 বর্তমানে: সৌদি আরব";
		const Age = "🎂 বয়স: ২৫ বছর";
		const Relation = "💔 রিলেশন: সিঙ্গেল — (কোনো মেয়ে থাকলে ইনবক্সে আসতে পারেন 😉)";
		const Facebook = "📘 ফেসবুক: https://www.facebook.com/Tanubruh41";
		const Instagram = "📸 ইন্সটাগ্রাম: https://instagram.com/Tanubruh";
		const Telegram = "📬 টেলিগ্রাম: https://t.me/Tanubruh";
		const Messenger = "💌 মেসেঞ্জার: https://m.me/Tanubruh41";

		const images = [
			"https://i.postimg.cc/mgcKfwsn/Photo-Studio-1669021964995.jpg",
			"https://i.postimg.cc/q73hW9g4/Pics-Art-10-09-10-50-18.jpg",
			"https://i.postimg.cc/T1RKL19F/Pics-Art-10-09-10-50-44.jpg",
			"https://i.postimg.cc/Pf4pGbf5/Pics-Art-10-09-10-51-06.jpg",
			"https://i.postimg.cc/QC3jVzXr/IMG-20250923-190030.jpg"
		];
		const randomImage = images[Math.floor(Math.random() * images.length)];

		const now = moment().tz('Asia/Dhaka');
		const date = now.format('DD MMMM YYYY');
		const time = now.format('hh:mm:ss A');

		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} দিন ${hours} ঘণ্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;

		message.reply({
			body: `✨━━━━━━━━━━━━━━━━━━✨
🌺 𝑩𝑶𝑻 𝑶𝑾𝑵𝑬𝑹 𝑰𝑵𝑭𝑶 🌺
✨━━━━━━━━━━━━━━━━━━✨

🤖 বট নাম: ${global.GoatBot.config.nickNameBot}
⚙️ প্রিফিক্স: ${global.GoatBot.config.prefix}

👑 নাম: ${ownerName}
${home}
${current}
${age}
${relation}

🌐 যোগাযোগ মাধ্যম:
${facebook}
${instagram}
${telegram}
${messenger}

📅 তারিখ: ${date}
⏰ সময়: ${time}
🕒 বট চালু আছে: ${uptimeString}

🕌 আল্লাহ আমাদের সবাইকে হেদায়েত দান করুন 🤲
✨━━━━━━━━━━━━━━━━━━✨`,
			attachment: await global.utils.getStreamFromURL(randomImage)
		});
	},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
