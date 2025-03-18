import { NextResponse } from 'next/server';
import { PlayerTeam } from '@/models/team.model';
import { supabaseClient } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { playerId, teamId } = body;

    const { data, error } = await supabaseClient
      .from('players_teams')
      .insert([{ player_id: playerId, team_id: teamId }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data as PlayerTeam);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 