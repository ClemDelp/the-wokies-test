import {Player} from "./player.model";

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

interface CountResponse {
    count: number;
}

export async function getAllPlayers(): Promise<Player[] | undefined> {
    try {
        const response = await fetch('/api/players');
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        const result = await response.json() as ApiResponse<Player[]>;
        return result.data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export async function getPlayerCount(): Promise<number | undefined> {
    try {
        const response = await fetch('/api/players/count');
        if (!response.ok) {
            throw new Error('Failed to fetch player count');
        }
        const result = await response.json() as CountResponse;
        return result.count;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export async function addPlayer(name: string, mail: string): Promise<Player | undefined> {
    try {
        const response = await fetch('/api/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mail }),
        });

        if (!response.ok) {
            throw new Error('Failed to add player');
        }

        const result = await response.json() as ApiResponse<Player>;
        return result.data;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
