import { MAX_HAND_CARDS } from "../../../constants/game/core.constants";
import type { IGameCard, IHero } from "../game.types";

export const drawCardsAction = (currentPlayer: IHero) => {

    const currentOnHand = currentPlayer.deck.filter(card => card.isOnHand).length

    const cardsNeeded = MAX_HAND_CARDS - currentOnHand

    let drawCards = 0

    const updatedDeck = currentPlayer.deck.map((card: IGameCard) => {

        if (!card.isTaken && !card.isOnHand && drawCards < cardsNeeded) {

            drawCards++

            return {
                ...card,
                isTaken: true,
                isOnHand: true
            }
        }

        return card
    })

    return { updatedDeck }
}