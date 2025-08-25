// api/webhook.js — Vercel Serverless Function
const TelegramBot = require("node-telegram-bot-api");

// IMPORTANT: لا تستخدم polling هنا. فقط webHook:false
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN");
}

const bot = new TelegramBot(token, { webHook: false });

// أوامر بسيطة
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "مرحباً! بوتك يعمل على Vercel ✅\nجرب /menu",
  );
});

bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "اختر خيار:", {
    reply_markup: {
      keyboard: [["📄 فتح صفحة", "ℹ️ معلومات"], ["❌ إغلاق"]],
      resize_keyboard: true
    }
  });
});

bot.on("message", (msg) => {
  if (msg.text === "📄 فتح صفحة") {
    bot.sendMessage(msg.chat.id, "هذه صفحة افتراضية داخل البوت.");
  } else if (msg.text === "ℹ️ معلومات") {
    bot.sendMessage(msg.chat.id, "بوت سيرفرلس على Vercel 🌐");
  } else if (msg.text === "❌ إغلاق") {
    bot.sendMessage(msg.chat.id, "تم إغلاق القائمة.");
  }
});

// الدالة الرئيسية — تتلقى POST من تليجرام
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const update = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      await bot.processUpdate(update);
      return res.status(200).send("ok");
    } catch (e) {
      console.error("processUpdate error:", e);
      return res.status(200).send("ok");
    }
  }
  // GET للفحص السريع
  res.status(200).send("Webhook alive");
};
