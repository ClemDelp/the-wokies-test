'use client'

import { useEffect, useState } from "react";
import { Player } from "@/shared/models/player.model";
import { getAllPlayers, addPlayer, getPlayerCount, sendInvite } from "@/shared/models/player.repository";
import { notification, Modal, Form, Input } from "antd";
import '@ant-design/v5-patch-for-react-19';

interface AddPlayerForm {
    name: string;
    mail: string;
}

export default function useHome() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [count, setCount] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [playersResponse, countResponse] = await Promise.all([
                getAllPlayers(),
                getPlayerCount()
            ]);

            if (playersResponse.error) {
                notification.error({ message: playersResponse.error });
                return;
            }

            if (playersResponse.data) {
                setPlayers(playersResponse.data);
            }

            if (countResponse.error) {
                notification.error({ message: countResponse.error });
                return;
            }

            if (countResponse.data !== undefined) {
                setCount(countResponse.data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const sendInvitationEmail = async (player: Player) =>{
        try {
            const response = await sendInvite(player);
            
            if (response.error) {
                notification.error({ message: response.error });
                return;
            }

            if (response.data) {
                notification.success({ message: 'Invitation sent at ' + player.mail });
            }
        } catch (error) {
            notification.error({ message: `Failed to send invitation to player: ${error}` });
        }
    }
    
    const handleAddPlayer = async (values: AddPlayerForm) => {
        try {
            const response = await addPlayer(values.name, values.mail);

            if (response.error) {
                notification.error({ message: response.error });
                return;
            }

            if (response.data) {
                setPlayers([...players, response.data]);
                setCount(prev => prev + 1);
                setIsModalOpen(false);
                form.resetFields();
                notification.success({ message: 'Player added successfully' });
                sendInvitationEmail(response.data);
            }
        } catch (error) {
            notification.error({ message: `Failed to add player: ${error}` });
        }
    };

    return {
        players,
        count,
        loading,
        isModalOpen,
        setIsModalOpen,
        form,
        handleAddPlayer
    }
}
