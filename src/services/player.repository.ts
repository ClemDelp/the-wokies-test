import { CountResponse, Player, PlayerState } from "../models/player.model";
import { supabaseClient } from "@/lib/supabaseClient";
import { ApiResponse, SupabaseResponse } from "./common.repository";



export async function getAllPlayers(): Promise<ApiResponse<Player[]>> {
    try {
        const response = await fetch('/api/players');
        const result = await response.json() as Player[];
        return { "data": result };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch players' };
    }
}

export async function getPlayerCount(): Promise<ApiResponse<number>> {
    try {
        const response = await fetch('/api/players/count');
        const result = await response.json() as CountResponse;
        return { data: result.count };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch player count' };
    }
}

export async function addPlayer(name: string, mail: string): Promise<ApiResponse<Player>> {
    try {
        const response = await fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mail }),
        });
        const result = await response.json() as Player;
        return { "data": result };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add player' };
    }
}

export async function sendInvite(player: Player): Promise<ApiResponse<String>> {
    try {
        // Send invitation email
        await fetch('/api/players/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: player }),
        });
        return { "data": "ok" };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to send invite' };
    }
}

export async function countPlayers(): Promise<SupabaseResponse<number>> {
    const { count: playerCount, error } = await supabaseClient
      .from('players')
      .select('*', { count: 'exact', head: true });

    return { 
        "data": playerCount ?? 0, 
        "error": error ?? undefined 
    }
}

export async function getPlayers(): Promise<SupabaseResponse<Player[]>> {
    const { data, error } = await supabaseClient
      .from('players')
      .select('*');

    return { 
        "data": data ?? [], 
        "error": error ?? undefined 
    }
}

export async function getPlayerById(id: string): Promise<SupabaseResponse<Player>> {
    const { data, error } = await supabaseClient
          .from('players')
          .select('*')
          .eq('id', id)
          .single();

    return {
        "data": data,
        "error": error ?? undefined
    }
}

export async function insertPlayer(name: string, mail: string): Promise<SupabaseResponse<Player>> {
    const { data: player, error } = await supabaseClient
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

    return { 
        "data": player, 
        "error": error ?? undefined 
    }
}

export async function updatePlayerState(id: string, state: PlayerState): Promise<SupabaseResponse<Player | undefined>> {
    const { data, error } = await supabaseClient
        .from('players')
        .update({ state: state })
        .eq('id', id);

    return {
        "data": data ?? undefined,
        "error": error ?? undefined
    }
}