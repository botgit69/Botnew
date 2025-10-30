const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "hstation",
    aliases: ["h", "station"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "fun",
    shortDescription: { en: "Send random HStation video" },
    longDescription: { en: "Send a random video from your HStation Google Drive list" },
    guide: { en: "{pn}" }
  },

  onStart: async function({ api, event }) {
    const videos = [
      "1-YzsEBf6xogYFd7ONM4Pz7HLi1TD07uA",
      "1-Lew8UEbBUAYAfdi2HELFRMwoUyMOuhm",
      "104RWJ1T2s6iUNuyg7O86TlnBtJ4qVYpc",
      "10153cAsmp3invR8TDePKk_l2d_d04KCo",
      "1-6NnCSB20x5TWzsTrVAhSXRjYgQI5kwh",
      "1-wVKtm3wTQCQwmV_Lp5imV-NJd4-FHNF",
      "10X7jyH4xf6Toe3NZuUJl0cYjvNwuZQZn",
      "10PnTGc2QMpIMqfGLjyTZticyAHrjGjHL",
      "1-6zYmQH2wt1ufYV_o1wmHsJdNjgDdG5L",
      "1-HhODCF3JyNHevO9TPF5Ga3vQEYqXcq9",
      "1-4hqV0hR-tkbqflvg27OjLn-IGloXa9j",
      "1-i7F2BROTF9mTCfkQ6CKbSwa-xYa-lwc",
      "1-msBKHXIjaIfnRpg3CfcgG2BPzKtZOA2",
      "10-jw_EE-KKLRkJ4RYgQtNTSH-SEqa7vg",
      "10XG92t_sZq8y1zuskMX95qus-R7dagb_",
      "1-Vrwg83PMte_bpF0oc7KHVjXoaCqu-dW",
      "1-UXRU6y3EWbq6rO5AHDxGubhWw_j8pzl",
      "1-runzCC8Q5HxwSfLPQvV7fTRfNJrVthw",
      "101fm9ADld3D-XumlbAT0SHY4m9ucHgVJ",
      "1-3VWn47Ix1kaF-B4jRqr_rChhEEnFDOg",
      "1-sIAcSXq8W-a_jInz0_721t01X6q8YZ5",
      "1-Yz340d82aj7Du6esZGAPiwW0T0cPJS1",
      "1-ae7eqMFmqh94ldyG-roRVw2TTFdxO19",
      "1-hfXuaHaYJOFaR6K9R4RzxFeQhbU7ZeS",
      "1-Ii2UlaFii5E3Yo_YONAYIpw1ux7VQPM",
      "1-2uzWSsY4hmSYUXFQCLTwhGaL3D27buh",
      "105ejfZLuGXCDJFJ5do6EgmO79-WnPvev",
      "1-ISAkLNrsnE8tYTfKrpy8h-xcqXf-DKl",
      "1-lrd01O-AOGKxM3_MdVp3u2PzzqqgLk7",
      "1-Qr37oFdw3wY5iR1-cvv8cmIydc5uwkt",
      "1-ok1gaIfaJVVFXVx0mSAnhKsxB15xlbx",
      "10YQGQEErw8XFIGfcNYkLpp5FmH_imZwh",
      "1-oMVohVayKiX9fp6kqoeE6sB7OijUs3s",
      "102H2BaX29iJcxV_QWhC2c8haBsXCAC6X",
      "1-mk_Ynw9ZLqSFQmCsKJNp6HcvQ2V_ov8",
      "10WUykujIk2QPDJSjWzo93SuIq2-BNGyT",
      "1-yizKsCG0q_f2bCbV5gnWV4zjC_vANt1",
      "10afC_ApqDz8l7LBRF2RbYqEgyK8xLYWa",
      "10H_5Fw3mBQNfHQs3jmEvzLJLmva903lS"
    ];

    const randomID = videos[Math.floor(Math.random() * videos.length)];
    const url = `https://drive.google.com/uc?export=download&id=${randomID}`;

    const filePath = path.join(__dirname, "temp_hstation.mp4");

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
          { body: "🎧 Here's your random Horny Station video!", attachment: fs.createReadStream(filePath) },
          event.threadID,
          () => fs.unlinkSync(filePath)
        );
      });

      writer.on("error", (err) => {
        console.error("Download failed:", err);
        api.sendMessage("❌ Failed to download HStation video.", event.threadID);
      });
    } catch (err) {
      console.error(err);
      api.sendMessage("⚠️ Couldn't fetch HStation video. Maybe Google Drive quota exceeded.", event.threadID);
    }
  }
};
