import type { IGameStore, IGameCard } from "../game.types";

export const drawFromSquirrelDeckAction = (state: IGameStore): Partial<IGameStore> => {

    if (state.drawCountThisTurn >= 2) {
        return state
    }

    const newSquirrel: IGameCard = {
        id: crypto.randomUUID(),
        name: "Squirrel",
        imageUrl: "/assets/cards/Squirrel.jpg",
        attack: 0,
        health: 1,
        mana: 0,

        isOnHand: true,
        isOnBoard: false,
        isTaken: true,
        isPlayedThisTurn: false,
        isCanAttack: false
    }

    return {
        player: {
            ...state.player,

            squirrelDeck: [
                ...state.player.squirrelDeck,
                newSquirrel
            ]
        },
        drawCountThisTurn: state.drawCountThisTurn + 1
    }
}