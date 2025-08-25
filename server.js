const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = process.env.PORT || 3000;

// التوكن من Vercel (Environment Variable)
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ لم يتم العثور على التوكن! أضفه في الإعدادات");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// رسالة الترحيب
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "✅ البوت شغال بنجاح على Vercel!");
});

// إضافة قائمة
bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, "اختر من القائمة:", {
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
    bot.sendMessage(msg.chat.id, "تم فتح الصفحة داخل البوت ✅");
  } else if (msg.text === "ℹ️ معلومات") {
    bot.sendMessage(msg.chat.id, "بوت تجريبي مستضاف على Vercel 🌐");
  } else if (msg.text === "❌ إغلاق") {
    bot.sendMessage(msg.chat.id, "تم إغلاق القائمة.");
  }
});

// مسار أساسي لفحص التشغيل
app.get("/", (req, res) => {
  res.send("✅ Bot is running on Vercel!");
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
