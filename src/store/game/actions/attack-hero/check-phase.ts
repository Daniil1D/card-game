import { MAX_HP } from "../../../../constants/game/core.constants";
import { useNotificationStore } from "../../../notification/notification.store";
import type { IGameStore } from "../../game.types";
import { applyOpponentAbility } from "./opponent-abilities/apply-opponent-ability";

export const checkPhase = (state: IGameStore) => {

  if (state.damageBalance >= MAX_HP) {

    if (state.phase === 1) {

      state.opponent.deck = state.opponent.deck.map(card => {
        if (card.isOnBoard || card.previewBoardIndex !== undefined) {
          return {
            ...card,
            isOnBoard: false,
            isOnHand: false,
            boardIndex: undefined,
            previewBoardIndex: undefined
          }
        }
        return card
      })

      state.phase = 2
      state.damageBalance = 0

      if (!state.opponentAbilityUsed && state.opponentAbility) {
        applyOpponentAbility(state)
      }

      useNotificationStore
        .getState()
        .show('2 ФАЗА НАЧАЛАСЬ', 'info')

    } else {

      state.isGameOver = true
      state.isGameStarted = false

      useNotificationStore
        .getState()
        .show('Ты выйграл', 'win')
    }
  }
};