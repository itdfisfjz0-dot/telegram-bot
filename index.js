const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

// 🔒 حط التوكن تبعك هنا
const token = 8646111360:AAFKNTTLICMGQdfeMYpaSoleJD8CcdLH18Q;

const bot = new TelegramBot(token, { polling: true });

// 📦 تخزين المستخدمين
let users = {};

// 🌐 صفحة السيرفر
app.get("/", (req, res) => {
  res.send("Bot is running ✅");
});

// 🚀 أمر start
bot.onText(/\/start/, (msg) => {
  const id = msg.from.id;

  if (!users[id]) {
    users[id] = { balance: 0 };
  }

  bot.sendMessage(id, "🔥 Welcome to TORTEX SHOP BOT", {
    reply_markup: {
      keyboard: [
        ["💰 Balance"],
        ["📊 Stats"],
        ["🛒 Shop"]
      ],
      resize_keyboard: true
    }
  });
});

// 💬 التعامل مع الرسائل
bot.on("message", (msg) => {
  const id = msg.from.id;
  const text = msg.text;

  if (!users[id]) return;

  if (text === "💰 Balance") {
    bot.sendMessage(id, `💰 Your balance: $${users[id].balance}`);
  }

  else if (text === "📊 Stats") {
    bot.sendMessage(id, `👥 Users: ${Object.keys(users).length}`);
  }

  else if (text === "🛒 Shop") {
    bot.sendMessage(id, "🛒 No products yet.");
  }
});

// 🚀 تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running...");
});
