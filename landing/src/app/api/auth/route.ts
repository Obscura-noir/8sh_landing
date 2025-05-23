import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password, mode } = await req.json();
  if (!email || !password) return NextResponse.json({ ok: false, error: 'Email и пароль обязательны' }, { status: 400 });
  if (mode === 'register') {
    const { error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  } else if (mode === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, user: data.user });
  }
  return NextResponse.json({ ok: false, error: 'Некорректный режим' }, { status: 400 });
} 