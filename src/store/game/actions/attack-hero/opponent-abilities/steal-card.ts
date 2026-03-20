import type { IGameStore } from "../../../game.types";

export const stealCardAbility = (state: IGameStore) => {

  const playerCardsOnBoard = state.player.deck.filter(c => c.isOnBoard)

  if (playerCardsOnBoard.length > 0) {

    const randomIndex = Math.floor(Math.random() * playerCardsOnBoard.length)
    const stolenCard = playerCardsOnBoard[randomIndex]

    state.player.deck = state.player.deck.filter(c => c.id !== stolenCard.id)

    const takenSlots = state.opponent.deck
      .filter(c => c.isOnBoard)
      .map(c => c.boardIndex)

    let freeSlot = undefined

    for (let i = 0; i < 4; i++) {
      if (!takenSlots.includes(i)) {
        freeSlot = i
        break
      }
    }

    if (freeSlot !== undefined) {
      stolenCard.boardIndex = freeSlot
      stolenCard.isOnBoard = true
      stolenCard.isOnHand = false
    } else {
      stolenCard.isOnHand = true
      stolenCard.isOnBoard = false
    }

    state.opponent.deck.push(stolenCard)
  }
};