import { PlayerState } from "@/models/player.model";

import { supabaseClient } from "@/lib/supabaseClient";
import { Player } from "@/models/player.model";
import { SupabaseResponse } from "@/repositories/common.repository";

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