import type { IGameStore, IGameCard } from "../game.types";

export const drawFromMainDeckAction = (state: IGameStore): Partial<IGameStore> => {
    if (state.hasDrawnThisTurn) {
        return state
    }

    let cardDrawn = false

    const updatedDeck = state.player.deck.map((card: IGameCard) => {

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

            deck: updatedDeck
        },
        hasDrawnThisTurn: true
    }
}