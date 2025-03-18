import { supabaseClient } from "@/lib/supabaseClient";
import { PlayerTeam } from "@/models/team.model";
import { SupabaseResponse } from "@/repositories/common.repository";

export async function countPlayersInTeam(teamId: string): Promise<SupabaseResponse<number>> {
    const { count, error: countError } = await supabaseClient
        .from('players_teams')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', teamId);


    return {
        data: count as number,
        error: countError || undefined
    };

} 

export async function checkPlayerInTeam(playerId: string, teamId: string): Promise<SupabaseResponse<PlayerTeam>> {
    // Check if the player is already in the team
    const { data: existingPlayer, error: checkError } = await supabaseClient
      .from('players_teams')
      .select('*')
      .eq('team_id', teamId)
      .eq('player_id', playerId)
      .single();

    return {
        data: existingPlayer as PlayerTeam,
        error: checkError || undefined
    };
} 

export async function addPlayerToTeamInDB(playerId: string, teamId: string): Promise<SupabaseResponse<PlayerTeam>> {
    const { data, error } = await supabaseClient
      .from('players_teams')
      .insert([{ player_id: playerId, team_id: teamId }])
      .select()
      .single();

    return {
        data: data as PlayerTeam,
        error: error || undefined
    };
} 