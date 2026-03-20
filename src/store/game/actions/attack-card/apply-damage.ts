import { useDamageStore } from "../../damage.store";
import type { IGameCard } from "../../game.types";

export const applyDamage = (
  attacker: IGameCard,
  target: IGameCard,
  targetId: string
) => {
  const damage = attacker.attack;

  const targetHealthBefore = target.health;

  if (attacker.type === "poison") {
    target.health = 0;
  } else {
    target.health -= damage;
  }

  useDamageStore.getState().addDamage(targetId, damage);

  attacker.isCanAttack = false;

  return {
    damage,
    targetHealthBefore
  };
};