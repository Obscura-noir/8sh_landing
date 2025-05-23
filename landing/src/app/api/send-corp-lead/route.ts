import { NextRequest, NextResponse } from 'next/server';

// Замените на свой токен и chat_id
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

export async function POST(req: NextRequest) {
  try {
    const { name, company, contact, comment } = await req.json();
    const text = `📝 Новая корпоративная заявка\n\n👤 ФИО: ${name}\n🏢 Компания: ${company}\n✉️ Контакт: ${contact}\n💬 Комментарий: ${comment || '-'}\n`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'Markdown',
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Telegram error' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
} 