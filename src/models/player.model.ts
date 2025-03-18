export enum PlayerState {
    RECEIVED_INVITE = "RECEIVED_INVITE",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED"
}

export interface Player {
    id: string
    name: string
    mail: string
    state: PlayerState
}
