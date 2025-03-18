'use client';

import { Player } from '@/shared/models/player.model';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface PlayersListProps {
    players: Player[];
    loading: boolean;
}

export function PlayersList({ players, loading }: PlayersListProps) {
    const columns: ColumnsType<Player> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            filters: [
                { text: 'Received Invite', value: 'RECEIVED_INVITE' },
                { text: 'Accepted', value: 'ACCEPTED' },
                { text: 'Declined', value: 'DECLINED' },
            ],
            onFilter: (value, record) => record.state === value,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={players}
            loading={loading}
            rowKey={(record) => record.id}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} players`,
            }}
        />
    );
}
