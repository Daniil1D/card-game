import type { IGameStore } from "../../game.types";
import { attackCardAction } from "../attack-card";
import { PlayRandomCard } from "./play-random-card";
import { MAX_MANA } from "../../../../constants/game/core.constants";
import { attackHeroAction } from "../attack-hero";
import { drawCardsAction } from "../draw-cards";


export const randomOpponentPlay = (state: IGameStore) => {
  const { updatedDeck } = drawCardsAction(state.opponent);
  const opponent = state.opponent;

  opponent.deck
    .filter((card) => card.isOnBoard)
    .forEach((card) => {

      if (!state.player.deck.filter((card) => card.isOnBoard).length) {
        state = { ...state, ...attackHeroAction(state, card.id) };
        return;
      }

      const target = state.player.deck.find(
        (playerCard) =>
          playerCard.isOnBoard &&
          playerCard.boardIndex === card.boardIndex
      );


      if (target) {
        state = {
          ...state,
          ...attackCardAction(state, card.id, target.id),
        };
      } else {

        state = {
          ...state,
          ...attackHeroAction(state, card.id),
        };
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
      deck: updatedDeck
    },
  };
};