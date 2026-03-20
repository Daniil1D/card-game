import type { IGameStore } from "../../game.types";
import { getCardById } from "../attack-card/get-card-by-id";
import { canAttackHero } from "./can-attack-hero";
import { applyHeroDamage } from "./apply-hero-damage";
import { checkPhase } from "./check-phase";
import { checkGameOver } from "./check-game-over";

export const attackHeroAction = (
  state: IGameStore,
  attackerId: string,
): Partial<IGameStore> => {

  const isAttackerPlayer = state.currentTurn === 'player'
  const opponent = isAttackerPlayer ? state.opponent : state.player

  const attacker = getCardById(
    attackerId,
    isAttackerPlayer ? state.player.deck : state.opponent.deck
  )

  if (canAttackHero(attacker, opponent.deck)) {

    applyHeroDamage(state, attacker!.attack, isAttackerPlayer)

    attacker!.isCanAttack = false

    checkPhase(state)

    checkGameOver(state)
  }

  return {
    player: state.player,
    opponent: state.opponent,
    damageBalance: state.damageBalance,
    isGameOver: state.isGameOver,
    isGameStarted: state.isGameStarted
  }
};