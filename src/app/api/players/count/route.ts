import { supabaseClient } from '@/config/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { count: playerCount, error } = await supabaseClient
      .from('players')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: playerCount });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 