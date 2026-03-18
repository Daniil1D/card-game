import type { IGameStore } from "../../game.types";
import random from "lodash/random";
import { MAX_BOARD_CARDS } from "../../../../constants/game/core.constants";

export const PlayRandomCard = (
  state: IGameStore,
  mana: number
) => {

  let playableCards = state.opponent.deck.filter(
    card => card.isOnHand && card.mana <= mana
  );

  if (state.phase === 2) {
    playableCards = playableCards.sort((a, b) => b.attack - a.attack)
  }

  if (playableCards.length === 0) return state;

  const randomCard =
    state.phase === 2
      ? playableCards[0]
      : playableCards[random(playableCards.length - 1)];

  const previewCards = state.opponent.deck.filter(
    card => card.previewBoardIndex !== undefined
  )

  const freeSlots = Array.from({ length: MAX_BOARD_CARDS }, (_, i) => i)
    .filter(index => !previewCards.find(card => card.previewBoardIndex === index))

  if (!freeSlots.length) return state

  const randomSlot = freeSlots[random(freeSlots.length - 1)] as number

  randomCard.previewBoardIndex = randomSlot
  randomCard.isOnHand = false
  randomCard.isPlayedThisTurn = true

  state.opponent.mana -= randomCard.mana

  return state
};