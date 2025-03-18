'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Result, Spin } from 'antd';
import { supabaseClient } from '@/config/supabaseClient';

export default function InvitePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const acceptInvite = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient
        .from('players')
        .update({ state: 'ACCEPTED' })
        .eq('id', id);

      if (error) throw error;
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to accept invitation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verify the invitation is valid
    const checkInvite = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('players')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Invitation not found');
        if (data.state !== 'RECEIVED_INVITE') {
          throw new Error('Invitation already processed');
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Invalid invitation');
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

  if (error) {
    return (
      <Result
        status="error"
        title="Invalid Invitation"
        subTitle={error}
      />
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