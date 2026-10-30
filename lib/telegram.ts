export async function sendOrderTelegramNotification(order: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
  }

  const message = [
    "Yangi buyurtma:",
    `№: ${order.orderNumber}`,
    `Mijoz: ${order.customerName}`,
    `Telefon: ${order.customerPhone}`,
    `To'lov usuli: ${order.paymentMethod}`,
    `Mahsulotlar: ${order.items.map((item: any) => `${item.product.name} x${item.quantity}`).join(", ")}`,
    `Jami: ${order.totalPrice} so'm`
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    });

    if (!response.ok) {
      console.error("Telegram notification failed", await response.text());
    }
  } catch (error) {
    console.error("Telegram error:", error);
  }
}
