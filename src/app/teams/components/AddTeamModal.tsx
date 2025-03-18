'use client';

import { Modal, Form, Input, notification } from 'antd';
import { addTeam } from '@/services/team.service';

interface AddTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface AddTeamForm {
    name: string;
}

export function AddTeamModal({ isOpen, onClose, onSuccess }: AddTeamModalProps) {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const { data, error } = await addTeam(values.name);
            
            if (error) {
                notification.error({ message: error });
                return;
            }
            
            notification.success({ message: 'Team created successfully' });
            
            form.resetFields();
            onSuccess();
            onClose();
        } catch (e) {
            notification.error({ 
                message: e instanceof Error ? e.message : 'Failed to create team' 
            });
        }
    };

    return (
        <Modal
            title="Add New Team"
            open={isOpen}
            onOk={handleSubmit}
            onCancel={onClose}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Team Name"
                    rules={[{ required: true, message: 'Please enter team name' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
} 