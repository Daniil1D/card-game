import type { IGameStore } from "../../game.types";
import { getCardById } from "./get-card-by-id";
import { applyDamage } from "./apply-damage";
import { resolveOverflow } from "./resolve-overflow";
import { cleanupDeadCards } from "./cleanup-dead";

export const attackCardAction = (
  state: IGameStore,
  attackerId: string,
  targetId: string
) => {

  const isAttackerPlayer = state.currentTurn === "player";

  const attacker = getCardById(
    attackerId,
    isAttackerPlayer ? state.player.deck : state.opponent.deck
  );

  const target = getCardById(
    targetId,
    isAttackerPlayer ? state.opponent.deck : state.player.deck
  );

  if (
    attacker &&
    target &&
    attacker.boardIndex !== target.boardIndex
  ) {
    return { player: state.player, opponent: state.opponent };
  }

  if (attacker && target && attacker.isCanAttack) {

    const { damage, targetHealthBefore } = applyDamage(
      attacker,
      target,
      targetId
    );

    resolveOverflow(
      state,
      isAttackerPlayer,
      attacker.boardIndex,
      damage,
      targetHealthBefore
    );

    const isKilled = targetHealthBefore > 0 && target.health <= 0;

    if (isKilled && attacker.type === "berserk") {
      attacker.attack += 1;
    }

    cleanupDeadCards(
      state,
      attackerId,
      targetId,
      isAttackerPlayer,
      attacker.health,
      target.health
    );
  }

  return { player: state.player, opponent: state.opponent };
};