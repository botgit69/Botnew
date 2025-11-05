const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");

const encodedUrl = "aHR0cHM6Ly9yYXNpbi14LWFwaXMub25yZW5kZXIuY29yZS5hcHAvYXBpL3JhY2luL2dm";
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
    name: "needgf",
    aliases: ["gf", "love"],
    version: "2.0",
    author: "Tanu + GPT",
    countDown: 10,
    role: 0,
    shortDescription: "Need a cute gf photo 💕",
    longDescription: "Send a random girlfriend photo with a caption 😍",
    category: "fun",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    try {
      const apiUrl = decode(encodedUrl);
      const apiKey = decode(encodedKey);
      const fullUrl = `${apiUrl}?apikey=${apiKey}`;

      const res = await axios.get(fullUrl);
      const { title, url } = res.data.data;

      const imgPath = path.join(__dirname, "cache", `${event.senderID}_gf.jpg`);
      await downloadImage(url, imgPath);

      api.sendMessage(
        { body: `💘 ${title}`, attachment: fs.createReadStream(imgPath) },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    } catch (err) {
      console.error("⚠️ Error fetching gf image:", err.message);
      api.sendMessage("❌ বাপরে! আজ গার্লফ্রেন্ড সার্ভার ঘুমাচ্ছে 😴", event.threadID);
    }
  }
};
