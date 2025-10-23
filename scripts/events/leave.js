const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: [
				"{userName} হায়! চা খাওয়ার সময়ও মিস করছে, গ্রুপ ছেড়ে গেলো ☕😂",
				"{userName} চলে গেলো! আমাদের গ্রুপ এখন ৫০% কম শক্তিশালী 💪🤣",
				"{userName} গ্রুপ থেকে উড়ে গেলো! হয়তো কোন মজার জায়গায় দৌড়াচ্ছে 🏃‍♂️💨",
				"{userName} ছেড়ে গেলো! আমাদের গ্রুপে এখন নীরবতা 😶😆",
				"{userName} হায়! এমন লাগছে যেনো লাইট চলে গেছে, গ্রুপে অন্ধকার 😜💡",
				"{userName} চলে গেলো! মনে হচ্ছে কেউ মজার জোকসই বলবে না এখন 😂",
				"{userName} গ্রুপ ত্যাগ করলো! কেউ কি ওকে আটকাতে পারতো না? 😎",
				"{userName} গিয়েছে! বাকি সবাই এখন চুপচাপ বসে আছে 🤭",
				"{userName} বিদায় নিলো! গ্রুপে এখন মজার হাহাকার শুরু 😹"
			]
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left",
			leaveType2: "was kicked from",
			defaultLeaveMessage: "{userName} {type} the group"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage) return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID()) return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				let leaveMessageTemplate = threadData.data.leaveMessage || getLang("defaultLeaveMessage");

				// যদি মেসেজ লিস্ট হয়, র‍্যান্ডম একটি বেছে নাও
				if (Array.isArray(leaveMessageTemplate)) {
					leaveMessageTemplate = leaveMessageTemplate[Math.floor(Math.random() * leaveMessageTemplate.length)];
				}

				const form = {
					mentions: leaveMessageTemplate.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				let leaveMessage = leaveMessageTemplate
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g, hours <= 10 ?
						getLang("session1") :
						hours <= 12 ?
							getLang("session2") :
							hours <= 18 ?
								getLang("session3") :
								getLang("session4")
					);

				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};
