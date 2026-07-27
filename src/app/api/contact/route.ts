import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Strip spaces from phone number so it appears as +998121231233
    const cleanPhone = phone ? phone.replace(/\s+/g, '') : 'Not provided';

    const telegramBotToken =
      process.env.TELEGRAM_BOT_TOKEN ||
      '8936239195:AAFOCWjcrsM1rJwktVzcjAFNc5aqcji8R3c';
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || '-5521878352';

    // Send Telegram Notification
    if (telegramBotToken && telegramChatId) {
      const telegramText = `📬 <b>New Portfolio Submission</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${cleanPhone}\n\n💬 <b>Message:</b>\n${message}`;

      const telegramRes = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
            parse_mode: 'HTML',
          }),
        }
      );

      const telegramResult = await telegramRes.json();

      if (!telegramRes.ok || !telegramResult.ok) {
        console.error('Telegram API error:', telegramResult);
        return NextResponse.json(
          { error: 'Failed to deliver message via Telegram bot.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
