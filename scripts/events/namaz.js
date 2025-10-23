const { setIntervalAsync } = require("set-interval-async/dynamic");
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "namaz_auto",
		version: "1.1",
		author: "Tanu Bruh",
		category: "events",
		description: "নামাজের সময় ইসলামিক বার্তা, হাদিস ও দোয়া পাঠাবে"
	},

	onLoad: function({ api }) {
		console.log("🕌 Namaz Auto Event with Hadith Loaded Successfully!");

		// প্রতি মিনিটে চেক করবে
		setIntervalAsync(async () => {
			const now = moment().tz("Asia/Dhaka");
			const hour = now.hour();
			const minute = now.minute();

			// নামাজের সময়
			const namazTimes = [
				{ 
					name: "ফজর", hour: 5, minute: 0,
					message: "🕌 আসসালামু আলাইকুম!\nএখন ফজর নামাজের সময়। আল্লাহর দিকে মুখ ফিরিয়ে নামাজ আদায় করুন। 🤲\n📖 হাদিস: “যে ব্যক্তি ফজর নামাজ আদায় করে, সে তার ইমানের পুরস্কার পাবে।”\n💚 দোয়া: ‘اللَّهُمَّ اجعلنا من الذاكرين لك في الليل والنهار’"
				},
				{ 
					name: "জোহর", hour: 12, minute: 15,
					message: "🕌 আসসালামু আলাইকুম!\nএখন জোহর নামাজের সময়। ভক্তি ও শান্তি অনুভব করুন। 🤲\n📖 হাদিস: “জোহরের নামাজ যিনি সময়মতো আদায় করবেন, আল্লাহ তার দিনকে আলোয় ভরিয়ে দেবেন।”\n💚 দোয়া: ‘اللَّهُمَّ اجعلنا من المتقين’"
				},
				{ 
					name: "আসর", hour: 15, minute: 45,
					message: "🕌 আসসালামু আলাইকুম!\nএখন আসর নামাজের সময়। হিয়ার্নত ও স্মৃতিশক্তি বৃদ্ধি করুন। 🤲\n📖 হাদিস: “আসর নামাজ ত্যাগ করা প্রমাণ যে মানুষ আল্লাহর প্রতি উদাসীন।”\n💚 দোয়া: ‘اللَّهُمَّ اجعلنا من الصالحين’"
				},
				{ 
					name: "মাগরিব", hour: 18, minute: 30,
					message: "🕌 আসসালামু আলাইকুম!\nএখন মাগরিব নামাজের সময়। আল্লাহর স্মরণে সময় দিন। 🤲\n📖 হাদিস: “মাগরিব নামাজ শেষে সূর্যাস্তের আলো মনের অন্ধকার দূর করে।”\n💚 দোয়া: ‘اللَّهُمَّ اجعلنا من الموفقين’"
				},
				{ 
					name: "ইশা", hour: 20, minute: 0,
					message: "🕌 আসসালামু আলাইকুম!\nএখন ইশা নামাজের সময়। শান্তি ও সমাধি অনুভব করুন। 🤲\n📖 হাদিস: “ইশার নামাজ আদায়কারী রাতের নিরাপত্তা লাভ করে।”\n💚 দোয়া: ‘اللَّهُمَّ اجعلنا من العابدين لك’"
				}
			];

			for (const namaz of namazTimes) {
				if (hour === namaz.hour && minute === namaz.minute) {
					try {
						const threads = await api.getThreadList(100, null, ["INBOX"]);
						for (const thread of threads) {
							await api.sendMessage(namaz.message, thread.threadID);
						}
					} catch (err) {
						console.error("❌ Error sending namaz message:", err);
					}
				}
			}
		}, 60 * 1000);
	}
};
