import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, password, mode, name, company } = await req.json();
  if (!email || !password) return NextResponse.json({ ok: false, error: 'Email и пароль обязательны' }, { status: 400 });
  if (mode === 'register') {
    const { data: userData, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    // Сохраняем профиль пользователя
    if (userData && userData.user && name && company) {
      const { error: profileError } = await supabase.from('user_profiles').insert({ user_id: userData.user.id, name, company });
      if (profileError) return NextResponse.json({ ok: false, error: profileError.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } else if (mode === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, user: data.user });
  }
  return NextResponse.json({ ok: false, error: 'Некорректный режим' }, { status: 400 });
} 