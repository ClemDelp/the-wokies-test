'use client';

import { Team } from '@/models/team.model';
import { Player } from '@/models/player.model';
import { Table, Button, Modal, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';
import { getTeamPlayers, addPlayerToTeam, getAllPlayers } from '@/services/team.repository';

interface TeamsListProps {
    teams: Team[];
    loading: boolean;
}

export function TeamsList({ teams, loading }: TeamsListProps) {
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
    const [teamPlayers, setTeamPlayers] = useState<Record<string, Player[]>>({});
    const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvailablePlayers = async () => {
            const { data, error } = await getAllPlayers();
            if (data) {
                setAvailablePlayers(data);
            }
        };
        fetchAvailablePlayers();
    }, []);

    useEffect(() => {
        const fetchTeamPlayers = async () => {
            const promises = expandedRowKeys.map(async (teamId) => {
                if (!teamPlayers[teamId as string]) {
                    const { data, error } = await getTeamPlayers(teamId as string);
                    if (data) {
                        setTeamPlayers(prev => ({ ...prev, [teamId as string]: data }));
                    }
                }
            });
            await Promise.all(promises);
        };

        fetchTeamPlayers();
    }, [expandedRowKeys]);

    const columns: ColumnsType<Team> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ];

    const playerColumns: ColumnsType<Player> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: 'Status',
            dataIndex: 'state',
            key: 'state',
        },
    ];

    const handleAddPlayer = async () => {
        if (!selectedTeam || !selectedPlayer) return;

        const { data, error } = await addPlayerToTeam(selectedPlayer, selectedTeam.id);
        if (data) {
            message.success('Player added to team successfully');
            // Refresh the team's players
            const { data: updatedPlayers, error: fetchError } = await getTeamPlayers(selectedTeam.id);
            if (updatedPlayers) {
                setTeamPlayers(prev => ({ ...prev, [selectedTeam.id]: updatedPlayers }));
            }
            setIsAddPlayerModalVisible(false);
            setSelectedPlayer(null);
        } else {
            message.error('Failed to add player to team');
        }
    };

    const expandedRowRender = (record: Team) => {
        return (
            <div>
                <div className="mb-4">
                    <Button 
                        type="primary" 
                        onClick={() => {
                            setSelectedTeam(record);
                            setIsAddPlayerModalVisible(true);
                        }}
                    >
                        Add Player
                    </Button>
                </div>
                <Table
                    columns={playerColumns}
                    dataSource={teamPlayers[record.id] || []}
                    pagination={false}
                    rowKey="id"
                />
                <Modal
                    title="Add Player to Team"
                    open={isAddPlayerModalVisible}
                    onOk={handleAddPlayer}
                    onCancel={() => {
                        setIsAddPlayerModalVisible(false);
                        setSelectedPlayer(null);
                    }}
                >
                    <Select
                        className="w-full"
                        placeholder="Select a player"
                        value={selectedPlayer}
                        onChange={setSelectedPlayer}
                    >
                        {availablePlayers.map(player => (
                            <Select.Option key={player.id} value={player.id}>
                                {player.name} ({player.mail})
                            </Select.Option>
                        ))}
                    </Select>
                </Modal>
            </div>
        );
    };

    return (
        <Table
            columns={columns}
            dataSource={teams}
            loading={loading}
            rowKey="id"
            expandable={{
                expandedRowRender,
                expandedRowKeys,
                onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
            }}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} teams`,
            }}
        />
    );
} 