import {Player} from "./player.model";
import {supabaseClient} from "@/config/supabaseClient";

export async function getAllPlayers(): Promise<Player[] | undefined> {
    try {
        const request = await supabaseClient
            .from("player")
            .select("*");

        if (request.error) {
            return undefined;
        }

        return request.data as Player[];
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
