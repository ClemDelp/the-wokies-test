import { Player } from "./player.model";

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

interface CountResponse {
    count: number;
}


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
