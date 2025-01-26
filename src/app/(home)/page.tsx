'use client'

import {Button, Flex} from "antd";
import {BannerHome} from "./components/banner.home";
import {PlusSquareOutlined} from "@ant-design/icons";
import useHome from "./callbacks/useHome";

export default function Home() {
    const home = useHome();

    return (
        <Flex vertical>
            <BannerHome icon={<PlusSquareOutlined />} title={"Create invitations"}/>
            <Flex justify={"space-between"} align={"center"} className={"w-full mt-4 pl-4 pr-4 box-border"}>
                <Button onClick={home.addPlayer} type={"primary"} size={"large"}>Add a new player</Button>
                <p>{home.players.length} invited player(s)</p>
            </Flex>
        </Flex>
    )
}
