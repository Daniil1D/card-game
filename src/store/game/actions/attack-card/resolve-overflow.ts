import { useDamageStore } from "../../damage.store";
import type { IGameStore } from "../../game.types";

export const resolveOverflow = (
  state: IGameStore,
  isAttackerPlayer: boolean,
  attackerBoardIndex: number | undefined,
  damage: number,
  targetHealthBefore: number
) => {
  if (damage <= targetHealthBefore) return;

  const overflowDamage = damage - targetHealthBefore;

  const enemy = isAttackerPlayer ? state.opponent : state.player;

  if (!isAttackerPlayer) {

    state.damageBalance -= overflowDamage;

    useDamageStore.getState().addDamage(
      "player",
      overflowDamage
    );

  } else {

    const frontCard = enemy.deck.find(
      card =>
        card.previewBoardIndex !== undefined &&
        card.previewBoardIndex === attackerBoardIndex
    );

    if (frontCard) {

      frontCard.health -= overflowDamage;

      useDamageStore.getState().addDamage(frontCard.id, overflowDamage);

      if (frontCard.health <= 0) {

        const remainingDamage = Math.abs(frontCard.health);

        enemy.deck = enemy.deck.filter(card => card.id !== frontCard.id);

        if (remainingDamage > 0) {

          state.damageBalance += remainingDamage;

          useDamageStore.getState().addDamage(
            "opponent",
            remainingDamage
          );
        }
      }

    } else {

      state.damageBalance += overflowDamage;

      useDamageStore.getState().addDamage(
        "opponent",
        overflowDamage
      );
    }
  }
};