import { Player } from '@/models/player.model';
import { Team, PlayerTeam } from '../models/team.model';
import { ApiResponse } from './common.repository';

export async function getAllTeams(): Promise<ApiResponse<Team[]>> {
    try {
        const response = await fetch('/api/teams');
        if (!response.ok) {
            return {"error": 'Failed to fetch teams'};
        }
        const teams = await response.json() as Team[];
        return {"data": teams};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch teams' };
    }
}

export async function getTeam(id: string): Promise<ApiResponse<Team>> {
    try {
        const response = await fetch(`/api/teams/${id}`);
        if (!response.ok) {
            return {"error": 'Failed to fetch team'}
        }
        const team = await response.json() as Team;
        return {"data": team};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch team' };
    }
}

export async function addTeam(name: string): Promise<ApiResponse<Team>> {
    try {
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            return {"error": 'Failed to add team'}
        }

        const team = await response.json() as Team;
        return {"data": team};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add team' };
    }
}

export async function addPlayerToTeam(playerId: string, teamId: string): Promise<ApiResponse<PlayerTeam>> {
    try {
        const response = await fetch('/api/teams/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerId, teamId }),
        });

        if (!response.ok) {
            return {"error": "Failed to add player to team"}
        }

        const player = await response.json() as PlayerTeam;
        return {"data": player};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add player to team' };
    }
}

export async function getTeamPlayers(teamId: string): Promise<ApiResponse<Player[]>> {
    try {
        const response = await fetch(`/api/teams/${teamId}/players`);
        if (!response.ok) {
            return {"error": "Failed to fetch team players"}
        }
        const players = await response.json() as Player[];
        return {"data": players};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch team players' };
    }
}

export async function getPlayerTeams(playerId: string): Promise<ApiResponse<Team[]>> {
    try {
        const response = await fetch(`/api/players/${playerId}/teams`);
        if (!response.ok) {
            return {"error": "Failed to fetch player teams"}
        }
        const teams = await response.json() as Team[];
        return {"data": teams};
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch player teams' };
    }
} 