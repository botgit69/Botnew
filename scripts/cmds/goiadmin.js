module.exports = {
	config: {
		name: "goiadmin",
		author: "Chitron Bhattacharjee",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "100006517930417") {
		var aid = ["100020665451099",""];
		for (const id of aid) {
		if ( Object.keys(event.mentions) == id) {
			var msg = ["কিরে তোর প্রোবলেম কি😒আমার বস কে মেনসন দিস কেন 🫰🏻🧛‍♀️মেনসন না দিয়ে আমার বসের ইনবক্সে মেয়ের নাম্বার দে☺️ এই নে ফেসবুক আইডিঃ www.facebook.com/Tanubruh41🫰🏻😊। 🦆 "];
			return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
		}
		}}
},
onStart: async function({}) {
	}
};
