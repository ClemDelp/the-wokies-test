'use client';

import { Team } from '@/models/team.model';
import { Player } from '@/models/player.model';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { getTeamPlayers } from '@/services/team.repository';

interface TeamsListProps {
    teams: Team[];
    loading: boolean;
}

export function TeamsList({ teams, loading }: TeamsListProps) {
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
    const [teamPlayers, setTeamPlayers] = useState<Record<string, Player[]>>({});

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

    const expandedRowRender = async (record: Team) => {
        if (!teamPlayers[record.id]) {
            const { data, error } = await getTeamPlayers(record.id);
            if (data) {
                setTeamPlayers(prev => ({ ...prev, [record.id]: data }));
            }
        }
        return (
            <Table
                columns={playerColumns}
                dataSource={teamPlayers[record.id] || []}
                pagination={false}
                rowKey="id"
            />
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