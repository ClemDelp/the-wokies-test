'use client';

import { useState, useEffect } from 'react';
import { Team } from '@/models/team.model';
import { getAllTeams } from '@/services/team.repository';
import { notification } from 'antd';

export function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeams = async () => {
        try {
            setLoading(true);
            const { data, error } = await getAllTeams();
            if (error) {
                notification.error({ message: error });
                return;
            }
            setTeams(data || []);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to fetch teams');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return {
        teams,
        loading,
        error,
        refreshTeams: fetchTeams,
    };
} 