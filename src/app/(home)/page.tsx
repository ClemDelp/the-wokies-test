'use client'

import { Button, Flex, Modal, Form, Input, Spin } from "antd";
import { BannerHome } from "./components/banner.home";
import { PlusSquareOutlined } from "@ant-design/icons";
import useHome from "./callbacks/useHome";
import { PlayersList } from "./components/playersList";

export default function Home() {
    const home = useHome();

    return (
        <Flex vertical>
            <BannerHome icon={<PlusSquareOutlined />} title={"Create invitations"} />
            {home.loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Spin size="large" tip="Loading..." />
                </div>
            ) : (
                <Flex justify={"space-between"} align={"center"} className={"w-full mt-4 pl-4 pr-4 box-border"}>
                    <Button onClick={() => home.setIsModalOpen(true)} type={"primary"} size={"large"}>Add a new player</Button>
                    <p>{home.count} invited player(s)</p>
                </Flex>
            )}
            <PlayersList players={home.players} loading={home.loading} />
            <Modal
                title="Add New Player"
                open={home.isModalOpen}
                onCancel={() => home.setIsModalOpen(false)}
                footer={null}
            >
                <Form
                    form={home.form}
                    onFinish={home.handleAddPlayer}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input the player name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="mail"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input the player email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Player
                        </Button>
                        <Button onClick={() => home.setIsModalOpen(false)} style={{ marginLeft: 8 }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Flex>
    )
}
