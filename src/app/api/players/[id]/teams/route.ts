import { NextResponse } from 'next/server';
import { Team } from '@/models/team.model';
import { supabaseClient } from '@/lib/supabaseClient';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseClient
      .from('players_teams')
      .select(`
        team:teams (
          id,
          name,
          created_at
        )
      `)
      .eq('player_id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the data to get just the team objects
    const teams = (data as unknown as { team: Team }[]).map(item => item.team);

    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 