const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// ضع التوكن هنا أو استخدم المتغير البيئي TELEGRAM_BOT_TOKEN في الاستضافة
const token = process.env.TELEGRAM_BOT_TOKEN || "8163345244:AAEpcGekt6dnqA5pXaTXRqMoomdDzKTFsrs";

const bot = new TelegramBot(token, { polling: true });

// رسالة ترحيبية
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "مرحباً! بوتك يعمل الآن ✅");
});

// إضافة أمر آخر للتجربة
bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "اختر خيار:", {
    reply_markup: {
      keyboard: [
        ["📄 فتح صفحة", "ℹ️ معلومات"],
        ["❌ إغلاق"]
      ],
      resize_keyboard: true
    }
  });
});

bot.on("message", (msg) => {
  if (msg.text === "📄 فتح صفحة") {
    bot.sendMessage(msg.chat.id, "هذه صفحة افتراضية داخل البوت.");
  } else if (msg.text === "ℹ️ معلومات") {
    bot.sendMessage(msg.chat.id, "بوت تجريبي على Koyeb 🌐");
  } else if (msg.text === "❌ إغلاق") {
    bot.sendMessage(msg.chat.id, "تم إغلاق القائمة.");
  }
});

// سيرفر صغير لـ Koyeb
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
