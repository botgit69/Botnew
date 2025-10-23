const { setIntervalAsync } = require("set-interval-async/dynamic");
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "hourly_islamic_ayat",
		version: "1.0",
		author: "Tanu Bruh",
		category: "events",
		description: "প্রতি ঘন্টা স্বয়ংক্রিয় ইসলামিক বার্তা + সময় + আয়াত পাঠাবে"
	},

	onLoad: function({ api }) {
		console.log("🕌 Hourly Islamic Ayat Event Loaded Successfully!");

		setIntervalAsync(async () => {
			const now = moment().tz("Asia/Dhaka");
			const hour = now.hour();
			const minute = now.minute();
			const timeStr = now.format("HH:mm");

			// প্রতি ঘন্টায় একবার (মিনিট 0 এ)
			if (minute === 0) {
				// ইসলামিক আয়াতের তালিকা (কিছু উদাহরণ)
				const ayats = [
					{ ayat: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", meaning: "আর যারা ঈমান এনেছে এবং সৎকাজ করেছে।" },
					{ ayat: "إِنَّ اللّهَ مَعَ الصَّابِرِينَ", meaning: "নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সঙ্গে আছেন।" },
					{ ayat: "فَاذْكُرُونِي أَذْكُرْكُمْ", meaning: "তাহলে আমাকে স্মরণ করো, আমি তোমাদের স্মরণ করবো।" },
					{ ayat: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا", meaning: "আল্লাহর উপাসনা কর এবং তার সঙ্গে কাউকে অংশীদার করো না।" },
					{ ayat: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", meaning: "হে আমার পালনকর্তা! আমাকে তোমার নেয়ামতের জন্য কৃতজ্ঞ হতে প্রেরণা দাও।" }
				];

				// র্যান্ডম আয়াত নির্বাচন
				const selected = ayats[Math.floor(Math.random() * ayats.length)];

				const message = `
🕌 আসসালামু আলাইকুম বন্ধুরা!  
⏰ এখন সময়: *${timeStr}* (Bangladesh Time)  

📖 ইসলামিক আয়াত: "${selected.ayat}"  
📝 অর্থ: "${selected.meaning}"  

🤲 আল্লাহ আমাদের জীবনকে নেক আমল, শান্তি এবং রহমত দিয়ে ভরে দিন।
`;

				try {
					const threads = await api.getThreadList(100, null, ["INBOX"]);
					for (const thread of threads) {
						await api.sendMessage(message, thread.threadID);
					}
					console.log(`✅ Hourly Islamic message sent at ${timeStr} Bangladesh Time!`);
				} catch (err) {
					console.error("❌ Error sending hourly Islamic message:", err);
				}
			}
		}, 60 * 1000); // প্রতি মিনিটে চেক করবে
	}
};
