import type { IGameStore, IGameCard } from "../game.types";

export const drawFromMainDeckAction = (state: IGameStore): Partial<IGameStore> => {

    if (state.drawCountThisTurn >= 2) {
        return state
    }

    const deck = state.player.deck

    if (deck.length === 0) {
        return state
    }

    const randomIndex = Math.floor(Math.random() * deck.length)

    const templateCard = deck[randomIndex]

    const newCard: IGameCard = {
        ...templateCard,
        id: crypto.randomUUID(),
        isOnHand: true,
        isOnBoard: false,
        isPlayedThisTurn: false,
        isCanAttack: false
    }

    return {
        player: {
            ...state.player,
            deck: [
                ...state.player.deck,
                newCard
            ]
        },
        drawCountThisTurn: state.drawCountThisTurn + 1
    }
}