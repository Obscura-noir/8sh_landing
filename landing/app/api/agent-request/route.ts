import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, company, phone, telegram, comment } = await req.json()
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return NextResponse.json({ ok: false, error: 'No bot token or chat id' }, { status: 500 })
  }

  const message = `\n🆕 Новая заявка на регистрацию агента!\n\n👤 Имя: ${name}\n🏢 Компания: ${company}\n📱 Телефон: ${phone}\n💬 Telegram: ${telegram}\n📝 Комментарий: ${comment}\n\nВремя: ${new Date().toLocaleString('ru-RU')}`

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    })
    if (tgRes.ok) {
      return NextResponse.json({ ok: true })
    } else {
      return NextResponse.json({ ok: false, error: 'Telegram error' }, { status: 500 })
    }
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Network error' }, { status: 500 })
  }
} 