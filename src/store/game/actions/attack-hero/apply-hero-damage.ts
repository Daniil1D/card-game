import { useDamageStore } from "../../damage.store";
import type { IGameStore } from "../../game.types";

export const applyHeroDamage = (
  state: IGameStore,
  attackerAttack: number,
  isAttackerPlayer: boolean
) => {

  if (isAttackerPlayer) {
    state.damageBalance += attackerAttack
  } else {
    state.damageBalance -= attackerAttack
  }

  useDamageStore
    .getState()
    .addDamage(isAttackerPlayer ? 'opponent' : 'player', attackerAttack)
};