import type { IGameStore } from "../../game.types";
import { attackCardAction } from "../attack-card/attack-card";
import { PlayRandomCard } from "./play-random-card";
import { MAX_MANA } from "../../../../constants/game/core.constants";
import { attackHeroAction } from "../attack-hero/attack-hero";

function drawOneCardForOpponent(state: IGameStore) {
  const deck = state.opponent.deck;

  const card = deck.find(c => !c.isTaken);

  if (!card) return;

  card.isTaken = true;
  card.isOnHand = true;
}

export const randomOpponentPlay = (state: IGameStore) => {
  drawOneCardForOpponent(state);

  const opponent = state.opponent;

  opponent.deck
    .filter((card) => card.isOnBoard)
    .forEach((card) => {

      const target = state.player.deck.find(
        (playerCard) =>
          playerCard.isOnBoard &&
          playerCard.boardIndex === card.boardIndex
      );

      if (target) {
        const attackResult = attackCardAction(state, card.id, target.id)

        state = {
          ...state,
          ...attackResult
        }

        return;
      }

      const heroAttackResult = attackHeroAction(state, card.id)

      state = {
        ...state,
        ...heroAttackResult
      }
    });

  let mana = opponent.mana;
  let iterations = 0;

  while (mana > 0 && iterations <= MAX_MANA) {
    const newState = PlayRandomCard(state, mana);

    mana = newState.opponent.mana;
    state = { ...state, ...newState };

    iterations++;
  }

  return {
    ...state,
    opponent: {
      ...state.opponent,
      mana: 0,
    },
  };
};