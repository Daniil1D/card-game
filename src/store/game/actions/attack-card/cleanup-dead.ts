import type { IGameStore } from "../../game.types";

export const cleanupDeadCards = (
  state: IGameStore,
  attackerId: string,
  targetId: string,
  isAttackerPlayer: boolean,
  attackerHealth: number,
  targetHealth: number
) => {

  if (targetHealth <= 0) {

    if (isAttackerPlayer) {
      state.opponent.deck = state.opponent.deck.filter(
        (card) => card.id !== targetId
      );
    } else {
      state.player.deck = state.player.deck.filter(
        (card) => card.id !== targetId
      );
    }
  }

  if (attackerHealth <= 0) {

    if (isAttackerPlayer) {
      state.player.deck = state.player.deck.filter(
        (card) => card.id !== attackerId
      );
    } else {
      state.opponent.deck = state.opponent.deck.filter(
        (card) => card.id !== attackerId
      );
    }
  }
};