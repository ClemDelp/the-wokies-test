import { countPlayers } from '@/services/player.repository';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data, error } = await countPlayers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 