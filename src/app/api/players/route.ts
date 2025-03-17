import { supabaseClient } from '@/config/supabaseClient';
import { NextResponse } from 'next/server';
import { Player } from '@/shared/models/player.model';

export async function GET() {
  try {
    const { data, error } = await supabaseClient
      .from('players')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Player[]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mail } = body;

    const { data, error } = await supabaseClient
      .from('players')
      .insert([
        {
          name,
          mail,
          state: 'RECEIVED_INVITE'
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Player);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 