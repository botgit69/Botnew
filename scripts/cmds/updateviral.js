const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "updateviral",
    aliases: ["viralupdate", "uvideo"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "media",
    shortDescription: { en: "Send a random viral video" },
    longDescription: { en: "Sends a random viral video from Google Drive links" },
    guide: { en: "{pn}" }
  },

  onStart: async function({ api, event }) {
    const driveVideos = [
      "1wRsWN_9vWSlxIaQCZG925EqbSCL-i6ek",
      "1CZ7MCOl-k-o3QwgEf3-_qZy7iAPd6qKu",
      "1-0PYLp6xMEPXGr3xT_WNr4Zudbya3IXc",
      "1gw0hF7-QIv46cP8LCFcJqQ1ade1MT0tl",
      "19qbZZ5YsVLkwxItJIlM5X4y0uBjXYP1Q",
      "1f5jnWdlYfiyR6JaB2cyh0MfxSV_-hj7C",
      "19FY-LiUwrvLTYyxxTHDqr5gObceu7xSp",
      "1dgb8dQGImjURuqzywKbAx5obnJ1Msm5M",
      "1UYh-W5kDvkqezQ6eYOjtZD_SzFYDkyyB",
      "1EOgwGm7jQV4B4Bi22z7cv8QXbn5FaKGw",
      "1FJyu-DM9GNa2VzVz0EkIjyPF-LRX_p9w",
      "1xpjfnu4KGGYwmJfsKi_HWiLJ85a8N_bL",
      "1jLHf1M6Kxf3pgyY-oT89fn2ZUe_iOE8_",
      "1A3WCFd-7A7RxxV4QKhipFduuMf-6QhY5",
      "1UNbfOnWThvhQxat9HjoTl3sFCiOCMoiV",
      "1srDSwB4FdmlNjmOA4R8nBjvUTmbI25RP",
      "1MVFQk6PFzrkQK_vi8jp9wfaSj8ta23jY",
      "1colf1sHaWP8xCfBuK9f7fS3chpVS2eg5",
      "15huV--ImcnPxFggSKTn4MwZeiDa3VN4m",
      "1Gmkryc0vbDm5IS6ACmP-SWxNmjbwOLPb",
      "12_f_OVAAh5Dghg3xX4ebWAZaUTwlYWv8",
      "1MrKLavsys0cOyXqRC1skzlWNdfLD2kQl",
      "1H7D_1wD37jMNAvvh4x4IlR9PrrGhg4YC",
      "1PTKLli_cD4scGlElpbxxMyUxmyFkFqsn",
      "19XfJ2O5LVTG8AEPearLJzf93_DW2hgO5",
      "1p-3z1PoTqTxe7gYXfLDj1gHvGKLBR3eQ",
      "1K1C_T4CP-n1w9Nyn9fZn-gb2koPc4Tt-",
      "104gjtzgmhVEs5VJ0CMnVREuq0MrmKcYd",
      "1OGaMvpTM6Wivs0zBF9nAsMm7rHNHHzlu",
      "1jokS3WP0ioel_YVC1HKarLf14Qf1K5fD",
      "1x8ctkeAzt75iN2DzoLL0royJGNKPvqxI",
      "1KOAs8QV25zRcKj7XSWUqMPC7t_3ksQ-a",
      "1sVszmHCgFbTvK7CcU5vXQY03cWcT4UIS",
      "1dzvamTZv7BHJeeYbo3XP7lDQsIhkHBOV",
      "1vIy8lci0JW68N8H2ezqj-YnMp4aeXO2g",
      "1xfHo21P5IDNRD-nvNGMFrvSCmqp3mL6A",
      "1CJNwlg633Bdb1m-m4_nSlWpcFi5ghT7x",
      "1k_XESVOu4vgdj3vVFD2Za4XkFQ_sui3C",
      "1YPT8g0zhvpiGRnX8RXYdQLC2jK8HNIU6",
      "1kGuDNdxSfBsNfFTc1Bxj1SWiaXorBPxN",
      "1VpTLoQx1dEMakUM-kkXST3Mmcj1knvVZ",
      "1lEuBSakurmkqIj58iX2B3Kt8b1uRJuVP",
      "1CUGNY5uBlWY3WXHjiLJEg1ZSYPbBxD8c",
      "16y2wP0ZiGj56xzXijhMftQInSPJWrnA-",
      "194mZYHzasSyJQjaJOR5GXY1YOFNtcmiv",
      "1P46Ci3dbhpsNnXCO7SxgfwI0Yofh2tCV",
      "11MBRdvcYFGIWKD6iMhi8G5gQGirRATkW",
      "1tU5fT_5Hazao4zU9sXcjJxt-nYdfWTOv",
      "1LrevTVpPn2qlXLfAPjA3ytop0cq_mV_o",
      "1n6NjwzKUldXgmJg3S6LJtqq4N5tEfCrf",
      "1J47g58SH9KzrNfzfagNzGWDLE0sWOLJC",
      "1i6fKEZHYrxJEtPwwXkuic9KDLkB3fVXR",
      "1_2Mg7Rwd2I_m7VRGnO114lIfBEUYDRLX",
      "1-24lNUGFCmxrcnz_S0DQJnEqWjMejTxN",
      "1kQZpqPa7BRsztCgfoVob1G4VwO6VgZve",
      "1wtClEryFu97jbYStZrZKg9rSvjpyE3YG",
      "12D7O8Glfz2m8V6hSjYjSy26gkYO3Yx5e",
      "18rYINuiw7DBzOS3kF3_IBxt3XgWN1yU1",
      "1jDdlhcCV8O-G45iEgTTWV3GEGqcNVgr_",
      "132ueH5VYMQxJmKjdEzmwmUBI27DptQTE",
      "1Rtf6gwJvRWWkspt1ZJ_K_jZ97F9GUsJm",
      "1SfEv2-WdS6MFuYJSzdhBwttR6FmxvOTU",
      "1k16t7sN0vEkZHHeYCByIAi9r60Pwqy1j",
      "1UT-OLK0DVClimxpWJAJyLHw1QEliO_T1"
    ];

    const random = driveVideos[Math.floor(Math.random() * driveVideos.length)];
    const url = `https://drive.google.com/uc?export=download&id=${random}`;
    const filePath = path.join(__dirname, "viral_video.mp4");

    try {
      const response = await axios({ url, method: "GET", responseType: "stream" });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          { body: "🔥 Viral Update & 2nd Part Updateviral² coming🤝 🎬", attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath)
        );
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Couldn't load viral video.", event.threadID);
    }
  }
};
