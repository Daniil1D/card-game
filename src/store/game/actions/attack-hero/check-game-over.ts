import { MAX_HP } from "../../../../constants/game/core.constants";
import { useNotificationStore } from "../../../notification/notification.store";
import type { IGameStore } from "../../game.types";

export const checkGameOver = (state: IGameStore) => {

  if (state.damageBalance <= -MAX_HP) {

    state.isGameOver = true
    state.isGameStarted = false

    useNotificationStore
      .getState()
      .show('Ты проиграл', 'lose')
  }
};