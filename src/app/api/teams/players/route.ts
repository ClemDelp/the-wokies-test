import { NextResponse } from 'next/server';
import { PlayerTeam } from '@/models/team.model';
import { addPlayerToTeamInDB, checkPlayerInTeam, countPlayersInTeam } from '@/repositories/team.repository';

const MAX_PLAYERS_PER_TEAM = 3;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { playerId, teamId } = body;

    // First, check the current number of players in the team
    const { data: count, error: errorCount } = await countPlayersInTeam(teamId);

    if (errorCount) {
      return NextResponse.json({ error: errorCount.message }, { status: 500 });
    }

    if (count && count >= MAX_PLAYERS_PER_TEAM) {
      return NextResponse.json(
        { error: `Team already has ${MAX_PLAYERS_PER_TEAM} players. Maximum limit reached.` },
        { status: 400 }
      );
    }

    const { data: existingPlayer, error: checkError } = await checkPlayerInTeam(playerId, teamId);
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Player is already in this team' },
        { status: 400 }
      );
    }

    // If all checks pass, add the player to the team
    const { data: playerTeam, error: errorPlayerTeam } = await addPlayerToTeamInDB(playerId, teamId);
    if (errorPlayerTeam) {
      return NextResponse.json({ error: errorPlayerTeam.message }, { status: 500 });
    }

    return NextResponse.json(playerTeam as PlayerTeam);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 