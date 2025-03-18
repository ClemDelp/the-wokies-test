'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPlayerById, updatePlayerState } from '@/services/player.repository';
import { PlayerState } from '@/models/player.model';
import { notification, Spin } from 'antd';
import { Button } from 'antd';
import { Result } from 'antd';

export default function InvitePage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const acceptInvite = async () => {
        try {
            setLoading(true);
            if (!id || Array.isArray(id)) {
                notification.error({ message: "Invalid player ID" });
                return;
            }
            const { data, error } = await updatePlayerState(id, PlayerState.ACCEPTED);

            if (error) throw error;
            setSuccess(true);
        } catch (e) {
            notification.error({ message: e instanceof Error ? e.message : 'Failed to accept invitation' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Verify the invitation is valid
        const checkInvite = async () => {
            try {
                if (!id || Array.isArray(id)) {
                    notification.error({ message: "Invalid player ID" });
                    return;
                }
                const { data, error } = await getPlayerById(id);
                if (error) throw error;
                if (!data) throw new Error('Invitation not found');
                if (data.state !== 'RECEIVED_INVITE') {
                    throw new Error('Invitation already processed');
                }
            } catch (e) {
                notification.error({ message: e instanceof Error ? e.message : 'Invalid invitation' });
            } finally {
                setLoading(false);
            }
        };

        checkInvite();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (success) {
        return (
            <Result
                status="success"
                title="Welcome to The Wokies!"
                subTitle="Your invitation has been accepted successfully."
            />
        );
    }

    return (
        <Result
            status="info"
            title="Accept Invitation"
            subTitle="Click the button below to accept your invitation to The Wokies"
            extra={[
                <Button type="primary" key="accept" onClick={acceptInvite}>
                    Accept Invitation
                </Button>
            ]}
        />
    );
} 