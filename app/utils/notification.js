require("dotenv").config();

const sendTelegramMessage = async (botToken, chatId, message, value) => {
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text: `${message}: ${value}`,
        parse_mode: "Markdown",
    };

    try {
        const response = await fetch(TELEGRAM_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.ok) {
            console.log("Message sent successfully:", result);
        } else {
            console.error("Error sending message:", result);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
};

const checkDataSpike = (min, max, data) => {
    const min_value = parseFloat(min);
    const max_value = parseFloat(max);
    const data_value = parseFloat(data);

    if (data_value > max_value) {
        sendTelegramMessage(process.env.BOT_TOKEN, process.env.BOT_CHAT_ID, `Alert! High value detected: ${data} 🚨`, `Maximum limit: ${max}`);
    } else if (data_value < min_value) {
        sendTelegramMessage(process.env.BOT_TOKEN, process.env.BOT_CHAT_ID, `Warning! Low value detected: ${data} ❄️`, `Minimum limit: ${min}`);
    }
}


module.exports = checkDataSpike;