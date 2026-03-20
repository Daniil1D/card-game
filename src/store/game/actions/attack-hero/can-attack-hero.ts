import type { IGameCard } from "../../game.types";

export const canAttackHero = (
  attacker: IGameCard | undefined,
  opponentDeck: IGameCard[]
) => {
  const opponentCardInFront = opponentDeck.find(
    card => card.isOnBoard && card.boardIndex === attacker?.boardIndex
  );

  return attacker && attacker.isCanAttack && !opponentCardInFront;
};