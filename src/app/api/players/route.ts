import { NextResponse } from 'next/server';
import { Player } from '@/models/player.model';
import { getPlayers, insertPlayer } from '@/services/player.repository';

export async function GET() {
  try {
    const { data, error } = await getPlayers();

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
    const { data, error } = await insertPlayer(name, mail);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as Player);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}