// api/webhook.js
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is missing in environment variables");
}

// نحتفظ بنسخة بوت واحدة عبر التشغيلات لتجنب تكرار التسجيل
let bot = global._vercel_bot;
if (!bot) {
  bot = new TelegramBot(token);      // بدون polling
  // سجّل الأوامر/الهاندلرز مرة واحدة
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "مرحباً! البوت يعمل الآن ✅ (Vercel Webhook)");
  });

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
      bot.sendMessage(msg.chat.id, "بوت تجريبي يعمل على Vercel 🌐");
    } else if (msg.text === "❌ إغلاق") {
      bot.sendMessage(msg.chat.id, "تم إغلاق القائمة.");
    }
  });

  global._vercel_bot = bot;
}

// دالة Vercel (Serverless)
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    // صحة سريعة للرابط
    return res.status(200).send("OK");
  }

  try {
    // تمرير التحديث القادم من تيليجرام للبوت
    await bot.processUpdate(req.body);
    return res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).send("ERROR");
  }
};
