import type { IGameStore, IGameCard } from "../game.types";

export const drawFromSquirrelDeckAction = (state: IGameStore): Partial<IGameStore> => {
    if (state.hasDrawnThisTurn) {
        return state
    }

    let cardDrawn = false

    const updatedSquirrelDeck = state.player.squirrelDeck.map((card: IGameCard) => {

        if (!card.isTaken && !card.isOnHand && !cardDrawn) {
            cardDrawn = true

            return {
                ...card,
                isTaken: true,
                isOnHand: true
            }
        }

        return card
    })

    return {
        player: {
            ...state.player,

            squirrelDeck: updatedSquirrelDeck
        },
        hasDrawnThisTurn: true
    }
}