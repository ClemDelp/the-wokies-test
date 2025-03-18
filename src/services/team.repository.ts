import { Team, PlayerTeam } from './team.model';

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

interface RepositoryResponse<T> {
    data?: T;
    error?: string;
}

export async function getAllTeams(): Promise<RepositoryResponse<Team[]>> {
    try {
        const response = await fetch('/api/teams');
        if (!response.ok) {
            throw new Error('Failed to fetch teams');
        }
        const result = await response.json() as ApiResponse<Team[]>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch teams' };
    }
}

export async function getTeam(id: string): Promise<RepositoryResponse<Team>> {
    try {
        const response = await fetch(`/api/teams/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch team');
        }
        const result = await response.json() as ApiResponse<Team>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch team' };
    }
}

export async function addTeam(name: string): Promise<RepositoryResponse<Team>> {
    try {
        const response = await fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            throw new Error('Failed to add team');
        }

        const result = await response.json() as ApiResponse<Team>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add team' };
    }
}

export async function addPlayerToTeam(playerId: string, teamId: string): Promise<RepositoryResponse<PlayerTeam>> {
    try {
        const response = await fetch('/api/teams/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerId, teamId }),
        });

        if (!response.ok) {
            throw new Error('Failed to add player to team');
        }

        const result = await response.json() as ApiResponse<PlayerTeam>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to add player to team' };
    }
}

export async function getTeamPlayers(teamId: string): Promise<RepositoryResponse<Player[]>> {
    try {
        const response = await fetch(`/api/teams/${teamId}/players`);
        if (!response.ok) {
            throw new Error('Failed to fetch team players');
        }
        const result = await response.json() as ApiResponse<Player[]>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch team players' };
    }
}

export async function getPlayerTeams(playerId: string): Promise<RepositoryResponse<Team[]>> {
    try {
        const response = await fetch(`/api/players/${playerId}/teams`);
        if (!response.ok) {
            throw new Error('Failed to fetch player teams');
        }
        const result = await response.json() as ApiResponse<Team[]>;
        return result;
    } catch (e) {
        console.error(e);
        return { error: e instanceof Error ? e.message : 'Failed to fetch player teams' };
    }
} 