import type { IGameStore } from "../game.types";

export const playCardAction = (state: IGameStore, cardId: string, boardIndex: number) => {
    const isPlayerTurn = state.currentTurn === "player"
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;

    let currentCardIndex = currentPlayer.deck.findIndex(
        card => card.id === cardId
    )

    let currentCard = currentPlayer.deck[currentCardIndex]

    let isSquirrelCard = false

    if (!currentCard) {
        currentCardIndex = currentPlayer.squirrelDeck.findIndex(
            card => card.id === cardId
        )

        currentCard = currentPlayer.squirrelDeck[currentCardIndex]

        if (currentCard) {
            isSquirrelCard = true
        }
    }

    if (!currentCard) {
        return state
    }

    if (currentPlayer.mana >= currentCard.mana) {

        currentCard.boardIndex = boardIndex
        currentCard.isOnBoard = true
        currentCard.isPlayedThisTurn = true
        currentCard.isOnHand = false
        currentCard.isCanAttack = true

        currentPlayer.mana -= currentCard.mana

        if (!isSquirrelCard) {
            currentPlayer.deck.splice(currentCardIndex, 1)
            currentPlayer.deck.push(currentCard)
        }

        if (isSquirrelCard) {
            currentPlayer.squirrelDeck.splice(currentCardIndex, 1)
            currentPlayer.deck.push(currentCard)
        }
    }

    return {
        player: isPlayerTurn ? currentPlayer : state.player,
        opponent: isPlayerTurn ? state.opponent : currentPlayer
    }
};