const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "shortrl2",
    aliases: ["short2", "reel2"],
    version: "1.0",
    author: "Tanu + GPT",
    role: 0,
    category: "fun",
    shortDescription: { en: "Send random short video (batch 2)" },
    longDescription: { en: "Sends a random Google Drive short video from your 30-link list" },
    guide: { en: "{pn}" }
  },

  onStart: async function ({ api, event }) {
    const videos = [
      "1xIFrU7s6X5zfv89oYsCyW-BnoytdyZes",
      "1SHm6uiuq6DGVi0gyfLBEQ45YNfip6ivF",
      "1Q9yrG4q_hYu9f_EuU3W27XuJl0kK8QAg",
      "1xv3mpm3sbfeXx901-nsNkyd3-kRpVo0Q",
      "1iGcSu3KT41sCh4MISe6p_NCmVyzgjee9",
      "1YRke2wwdCAU7WXv2Acr-XVvr4lxlMF8E",
      "158SebuACoMDvSKzKzxxcNwCT8L5EcoG-",
      "1-ejitpYxnxob3YJvmXugT-laU21lVEci",
      "1yW6UkFmBfHiXwJ6gq1RjmAGp_JDLGhd-",
      "1QiixihjunsiIMdB5ST-6rGdk53x5JPhl",
      "1EW3R_MEL3v1vyyijPYKerHDSVw6Y6uXm",
      "13TtKGE0d7yHmm1zdr8hKfcMrM4D-X9qw",
      "1oslZPO62it8oKmMWleJsdC9GtZPdXhBV",
      "1gkVDcgrMYtrVNyykd8k9f5q5sdDJj26g",
      "1L97t25_tbLeztZ1e1Irm3gDn9aUCRVUt",
      "1RVhV60WhXdd_6Vyzasl2xb-bPstq1TsZ",
      "1CRr93UoxRzVj02jz2rS8pTZY-2StblJh",
      "1mDP4Y1DH8VR36CAy6HEKAJ8vMB6Z--z7",
      "1mn7lvWe9wy56CQkLvSk0hHAi97P6OBA6",
      "1oD5cb7liPpWqDLCFfTTjys7vm8YdYHrX",
      "1_lAgflvXzRrMiV2ZSN5WLgbTympu8ADo",
      "1p20XCN0q02gqW_0Xd6qMWu6_TI5mZS-5",
      "1gQhNmKK3tXJWdwaB3X3xt7cAvlteW6jo",
      "1W4e7RnHYFDvwroorZlU86S7HgiNrCxaA",
      "1ZwJReoPJB5HfA14R3IqObEDhU1cIkw3i",
      "1xo2e_Xy7_6wphqmS5ydloGVHGJBBe0wq",
      "15_9W1khGcepxNoIYSu0BQByHil4DRTc0",
      "19Cm-Gcx6Oo6z3hhUPCc5y9glvWiTiO3_",
      "1po-678B40VUmHTNDcqpY5FI17WWxxHxo",
      "1rBzakhIRg8impLN5ao9ukH0wbv1GJcbF"
    ];

    const randomID = videos[Math.floor(Math.random() * videos.length)];
    const url = `https://drive.google.com/uc?export=download&id=${randomID}`;

    try {
      api.sendMessage({
        body: "🎬 Here's your random short (Batch 2)!",
        attachment: await global.utils.getStreamFromURL(url)
      }, event.threadID);
    } catch (err) {
      console.error("❌ Error sending short:", err);
      api.sendMessage("⚠️ Couldn't send the short video.", event.threadID);
    }
  }
};
