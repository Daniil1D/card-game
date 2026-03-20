import type { IGameStore } from "../../../game.types";

export const boardControlAbility = (state: IGameStore) => {

  const playerCards = state.player.deck.filter(c => c.isOnBoard)

  playerCards.forEach(card => {

    state.player.deck = state.player.deck.filter(c => c.id !== card.id)

    card.isOnHand = false
    card.isOnBoard = true

    const takenSlots = state.opponent.deck
      .filter(c => c.isOnBoard)
      .map(c => c.boardIndex)

    if (takenSlots.includes(card.boardIndex!)) {
      for (let i = 0; i < 4; i++) {
        if (!takenSlots.includes(i)) {
          card.boardIndex = i
          break
        }
      }
    }

    state.opponent.deck.push(card)
  })

  const strongCards = state.opponent.deck.filter(c => c.attack >= 2)

  if (strongCards.length >= 2) {
    state.opponent.deck.push(
      { ...strongCards[0], id: crypto.randomUUID() },
      { ...strongCards[1], id: crypto.randomUUID() }
    )
  }

  state.opponent.mana += 2
};