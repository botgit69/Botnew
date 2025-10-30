const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "gdrive",
    aliases: ["drive", "video"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "fun",
    shortDescription: { en: "Send random Google Drive video" },
    longDescription: { en: "Send a random Google Drive video from your preset list" },
    guide: { en: "{pn}" }
  },

  onStart: async function({ api, event }) {
    const videos = [
      "1kmJEtoQGXtqP2ublwVzaR4nTN1DnijJv",
      "1WTyioxihDMY23oEeb3G_QAfuyPSPa8_u",
      "14UHNTWBjW-rBBkWZeOdWRhhgvYaqHAeX",
      "1h2HM7SmObA3yAzLCaE20xaxiln_TE91I",
      "1JYpviM25FE2-TL5C0JdVvtdX24O-r7-z",
      "1z7Y5qJYlfWxM1t91cXaltwAKkqkV-gTq",
      "1qnWdrwBLBItxjqlFoBorkZgm2JPkYQ3D",
      "1wyh-X4Wf4mq-keBKxFi6rnd2tszGgJg4",
      "16M-C7ANd1A1UvSTavjsNdMnR5P6RQvlZ",
      "1O-cero5f3fDwRBltsAw_Iv7rx_Vewjx2",
      "101m99_oEbkyrOHqUYXoybETpkiKRq7gr",
      "1MrFoXAF962ZknIFvWxMPuOyJ09cYpFpC",
      "14JXVfUBWFP5fZE6T2_ZsA5bzlL37K2PZ",
      "1KTP8nMrg_DKaqEDikJ1rIXvSTeKz94Yo",
      "1kUS3BEGnSOytiqqCNptw1v-6hD8QcTAY",
      "1AJneahd-8VXwWl3BoWvxPAYAWBvWBKGA",
      "1KRNlD9Q3XbmD6MNYV0Wv54mqATkVMAE7",
      "1D_3JFPz-OGC_uzWv-mtmxXZtMWkHS3PL",
      "1nkbQ_9l--8QCG2D8jMxKFM07C5QKzR_W",
      "1q4IWLLEzOmXprgWJmnDdth5EzXWEu_6t",
      "1LEegnb5ZY_FdFLe9D6XZzy5Lfzy77hQm",
      "1A8xemB5eRfUDqeN8clP90QI3rruCpzUa",
      "1RMIKqOdWlqzGXGsFY3a1s3R4776jvMwa",
      "1xRVVgI9jHWMDBF6sOe9AwwKK1kAKWZfE",
      "1gVPg4vpjxr-RNTt_9O_h4vMvXomGwrTz",
      "1qtIPicuOVZYyR_I85Tb8ESrS4vyS6KAs",
      "1sTfTg6cHl21y3W3Ytf8LXLxF0GMBoBMV",
      "1r4Fldkeo_uLkZUXuit2ZijyrslcBIuGI",
      "1RdsodNTTEc5LGGgo0ZAbmlRXGkTXA3tN",
      "1IpVdSQMQ7LYJw4X3ZvT0RWe9onCWSXiX",
      "1kuzqIwhbjEKVCQBvCBYDsP2Qu5sk9fvM",
      "1cV6dCHhMael8giD4H0iLc9lEke3AQhyX",
      "1unohqjA2v90enoiqE9CNQeKvKJ-syR0S",
      "1-4ANTJorGNNMuOE8qvDI5Mv3FjUp29wp",
      "1gshXXbNPq4a7k4zrhDbFjnYNiKPjZGLV",
      "1zC-a60KCokw5VRHQ3oEdpwV_hVfnW-G6",
      "13IiDyRDUiFGo302Jbk7MuyEFADNw5Y-5",
      "1avAUPU48_Srvj6kQj-qZ2k1wROyRY-nA",
      "1defqGO3aTuAZrnuNI8wDlSxsUvcEtloI",
      "17nJ25mNxXbwIJGWz4B7JV2Ge19D9Bn17",
      "1y-y8CCRf_B9buvH_i5UuAAg8yEAhBjEQ"
    ];

    const randomID = videos[Math.floor(Math.random() * videos.length)];
    const url = `https://drive.google.com/uc?export=download&id=${randomID}`;

    const filePath = path.join(__dirname, "temp_video.mp4");

    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          { body: "🎬 Here's your random video Thanks Tanvir Ankhon!", attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath)
        );
      });

      writer.on("error", (err) => {
        console.error("Download failed:", err);
        api.sendMessage("❌ Failed to download video.", event.threadID);
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Couldn't fetch video. Maybe Google Drive quota exceeded.", event.threadID);
    }
  }
};
