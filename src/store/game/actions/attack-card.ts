import { useDamageStore } from "../damage.store";
import type { IGameCard, IGameStore } from "../game.types";

export const getCardById = (cardId: string, deck: IGameCard[]) =>
  deck.find((card) => card.id === cardId);

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

    const damage = attacker.attack;

    const targetHealthBefore = target.health;

    if (attacker.type === "poison") {
      target.health = 0;
    } else {
      target.health -= damage;
    }

    useDamageStore.getState().addDamage(targetId, damage);

    attacker.isCanAttack = false;

    if (damage > targetHealthBefore) {

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
            card.previewBoardIndex === attacker.boardIndex
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
    }

    const isKilled = targetHealthBefore > 0 && target.health <= 0;

    if (isKilled && attacker.type === "berserk") {
      attacker.attack += 1;
    }

    if (target.health <= 0) {

      if (isAttackerPlayer) {
        state.opponent.deck = state.opponent.deck.filter(
          (card) => card.id !== targetId
        );
      } else {
        state.player.deck = state.player.deck.filter(
          (card) => card.id !== targetId
        );
      }
    }

    if (attacker.health <= 0) {

      if (isAttackerPlayer) {
        state.player.deck = state.player.deck.filter(
          (card) => card.id !== attackerId
        );
      } else {
        state.opponent.deck = state.opponent.deck.filter(
          (card) => card.id !== attackerId
        );
      }
    }
  }

  return { player: state.player, opponent: state.opponent };
};
