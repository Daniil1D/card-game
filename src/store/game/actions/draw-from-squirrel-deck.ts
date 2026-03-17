import type { IGameStore, IGameCard } from "../game.types";

export const drawFromSquirrelDeckAction = (state: IGameStore): Partial<IGameStore> => {

    if (state.hasDrawnThisTurn) {
        return state
    }

    const newSquirrel: IGameCard = {
        id: crypto.randomUUID(),
        name: "Squirrel",
        imageUrl: "/assets/cards/squirrel.png",
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
        hasDrawnThisTurn: true
    }
}