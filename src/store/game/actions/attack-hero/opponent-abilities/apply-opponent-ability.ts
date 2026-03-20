import type { IGameStore } from "../../../game.types";
import { stealCardAbility } from "./steal-card";
import { boardControlAbility } from "./board-control";

export const applyOpponentAbility = (state: IGameStore) => {

  if (state.opponentAbility === "stealCard") {
    stealCardAbility(state)
  }

  if (state.opponentAbility === "boardControl") {
    boardControlAbility(state)
  }

  state.opponentAbilityUsed = true
};