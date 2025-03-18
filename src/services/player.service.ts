import { Player } from "../models/player.model";
import { ApiResponse } from "./common.service";



export async function getAllPlayers(): Promise<ApiResponse<Player[]>> {
    try {
        const response = await fetch('/api/players');
        const data = await response.json();
        
        if (!response.ok) {
            console.log('Error response:', data);
            return { error: data.error || "Failed to add player" };
        }
        
        return { data: data as Player[]};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch players' };
    }
}

export async function getPlayerCount(): Promise<ApiResponse<number>> {
    try {
        const response = await fetch('/api/players/count');
        const data = await response.json();
        
        if (!response.ok) {
            console.log('Error response:', data);
            return { error: data.error || "Failed to add player" };
        }
        
        return { data: data as number};
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
        const data = await response.json();

        if (!response.ok) {
            console.log('Error response:', data);
            return { error: data.error || "Failed to add player" };
        }
        return { data: data as Player };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add player' };
    }
}

export async function sendInvite(player: Player): Promise<ApiResponse<String>> {
    try {
        // Send invitation email
        const response = await fetch('/api/players/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ player: player }),
        });
        
        const data = await response.json();

        if (!response.ok) {
            console.log('Error response:', data);
            return { error: data.error || "Failed to send invite" };
        }
        return { data };
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to send invite' };
    }
}
