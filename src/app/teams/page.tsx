'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { TeamsList } from './components/TeamsList';
import { AddTeamModal } from './components/AddTeamModal';
import { useTeams } from './callbacks/useTeams';

export default function TeamsPage() {
    const { teams, loading, refreshTeams } = useTeams();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Teams</h1>
                <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                    Add Team
                </Button>
            </div>

            <TeamsList teams={teams} loading={loading} />

            <AddTeamModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={refreshTeams}
            />
        </div>
    );
} 