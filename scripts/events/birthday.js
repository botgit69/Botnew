const { setIntervalAsync } = require("set-interval-async/dynamic");
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "birthday_auto",
		version: "1.4",
		author: "Tanu Bruh",
		category: "events",
		description: "জন্মদিন রাত ১২:০০ টায় স্বয়ংক্রিয়ভাবে সব গ্রুপে ইমোশনাল উইশ পাঠাবে"
	},

	onLoad: function({ api }) {
		console.log("🎉 Birthday Auto Event Loaded Successfully!");

		setIntervalAsync(async () => {
			const now = moment().tz("Asia/Dhaka");
			const day = now.date();
			const month = now.month() + 1; // moment মাস 0 থেকে শুরু
			const hour = now.hour();
			const minute = now.minute();

			// যদি ৩০ অক্টোবর শুরু হয় (রাত ১২:০০)
			if (day === 30 && month === 10 && hour === 0 && minute === 0) {
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
🌏পৃথিবীর যে প্রান্তে থাকো মায়ের ভালোবাসা থেকে বঞ্চিত হবেনা এবং ওই মা-ই কিন্তু তোমাকে প্রথম উইশ করেছে @MD Tanvir Ahmmed Chowdhury ভাই তোমার ইমু চেক করো😅
`;

				try {
					const threads = await api.getThreadList(100, null, ["INBOX"]);
					for (const thread of threads) {
						await api.sendMessage(message, thread.threadID);
					}
					console.log("✅ Emotional Birthday message sent to all threads at 12:00 AM Bangladesh Time!");
				} catch (err) {
					console.error("❌ Error sending birthday message:", err);
				}
			}
		}, 60 * 1000); // প্রতি মিনিটে চেক করবে
	}
};
