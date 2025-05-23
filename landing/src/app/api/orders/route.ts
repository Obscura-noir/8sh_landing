import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { user_id, ...fields } = data;
  if (!user_id) return NextResponse.json({ ok: false, error: 'user_id required' }, { status: 400 });
  const { data: order, error } = await supabase.from('orders').insert([{ user_id, ...fields }]).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, id: order.id });
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const { id, ...fields } = data;
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 });
  const { error } = await supabase.from('orders').update(fields).eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 });
  const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  if (!user_id) return NextResponse.json({ ok: false, error: 'user_id required' }, { status: 400 });
  const { data, error } = await supabase.from('orders').select('*').eq('user_id', user_id).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, orders: data });
} 