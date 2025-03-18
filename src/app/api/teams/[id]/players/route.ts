import { NextResponse } from 'next/server';
import { Player } from '@/models/player.model';
import { supabaseClient } from '@/lib/supabaseClient';

interface PlayerTeamJoin {
  player: {
    id: string;
    name: string;
    mail: string;
    state: string;
  };
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseClient
      .from('players_teams')
      .select(`
        player:players (
          id,
          name,
          mail,
          state
        )
      `)
      .eq('team_id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to get just the player objects
    const players = (data as unknown as PlayerTeamJoin[]).map(item => ({
      id: item.player.id,
      name: item.player.name,
      mail: item.player.mail,
      state: item.player.state as Player['state']
    }));

    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 