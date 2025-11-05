const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");

// 👉 তোমার নিজের দুইটা পিক নিচে দে (randomly পাঠাবে)
const yourPhotos = [
  "https://i.postimg.cc/T1RKL19F/Pics-Art-10-09-10-50-44.jpg",
  "https://i.postimg.cc/q73hW9g4/Pics-Art-10-09-10-50-18.jpg"
];

// র‍্যান্ডম BF পিকের API
const encodedUrl = "aHR0cHM6Ly9yYXNpbi14LWFwaXMub25yZW5kZXIuY29yZS5hcHAvYXBpL3JhY2luL2Jm";
const encodedKey = "cnNfdDFnM2Izc2EtOXloZS1ja3g3LTlvdzEtcnA=";

function decode(base64) {
  return Buffer.from(base64, "base64").toString("utf-8");
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, res => {
      if (res.statusCode !== 200) return reject(new Error(`❌ Image fetch failed: ${res.statusCode}`));
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", err => {
      fs.unlinkSync(filePath);
      reject(err);
    });
  });
}

module.exports = {
  config: {
    name: "needbf",
    version: "2.6",
    author: "Tanu + GPT",
    countDown: 10,
    role: 0,
    shortDescription: "তোর নিজের পিক + র‍্যান্ডম বয়ফ্রেন্ড পিক 💞",
    longDescription: "তোর ছবি আর র‍্যান্ডম BF এর ছবি একসাথে পাঠায় cute caption সহ 😍",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const apiUrl = decode(encodedUrl);
      const apiKey = decode(encodedKey);
      const fullUrl = `${apiUrl}?apikey=${apiKey}`;

      // র‍্যান্ডম BF ইমেজ নে
      const res = await axios.get(fullUrl);
      const { title, url } = res.data.data;

      // নিজের পিক র‍্যান্ডমলি সিলেক্ট কর
      const randomYourPhoto = yourPhotos[Math.floor(Math.random() * yourPhotos.length)];

      const bfPath = path.join(__dirname, "cache", `${event.senderID}_bf.jpg`);
      const yourPath = path.join(__dirname, "cache", `${event.senderID}_you.jpg`);

      await downloadImage(url, bfPath);
      await downloadImage(randomYourPhoto, yourPath);

      api.sendMessage(
        {
          body: `💞 ${title}\n\nতুমি আর তোমার ড্রিম বয়ফ্রেন্ড 💘`,
          attachment: [
            fs.createReadStream(yourPath),
            fs.createReadStream(bfPath)
          ]
        },
        event.threadID,
        () => {
          fs.unlinkSync(bfPath);
          fs.unlinkSync(yourPath);
        },
        event.messageID
      );
    } catch (err) {
      console.error("⚠️ Error:", err.message);
      api.sendMessage("😅 আজ বয়ফ্রেন্ড খুঁজে পাওয়া গেল না ভাই!", event.threadID);
    }
  }
};
