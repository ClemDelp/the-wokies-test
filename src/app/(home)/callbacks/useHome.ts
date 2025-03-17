'use client'

import {useEffect, useState} from "react";
import {Player} from "@/shared/models/player.model";
import {getAllPlayers, addPlayer} from "@/shared/models/player.repository";
import {notification, Modal, Form, Input} from "antd";
import '@ant-design/v5-patch-for-react-19';

interface AddPlayerForm {
    name: string;
    mail: string;
}

export default function useHome() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    const fetchPlayers = async () => {
        const players = await getAllPlayers()
        setLoading(false);

        if (!players) {
            return notification.error({message: "Error while fetching players"});
        }

        setPlayers(players);
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    const handleAddPlayer = async (values: AddPlayerForm) => {
        console.log('add player')
        const newPlayer = await addPlayer(values.name, values.mail);
        
        if (!newPlayer) {
            notification.error({message: "YO! Error while adding player"});
            return;
        }

        notification.success({message: "Player added successfully"});
        setIsModalOpen(false);
        form.resetFields();
        fetchPlayers();
    }


    return {
        players,
        loading,
        isModalOpen,
        setIsModalOpen,
        form,
        handleAddPlayer
    }
}
