import { useGameStore } from "../../../../store/game/game.store";
import { useSelectAttacker } from "../../../../store/game/select-attacker";

export function useEnemyTarget() {
  const { attackHero, attackCard, currentTurn } = useGameStore();
  const { cardAttackerId, setCardAttackerId } = useSelectAttacker();

  const handleSelectTarget = (targetId?: number, isHero = false) => {
    if (!cardAttackerId) return;

    if(currentTurn === 'opponent') return

    if (isHero) {
      attackHero(cardAttackerId);
    } else if (targetId) {
      attackCard(cardAttackerId, targetId);
    }

    setCardAttackerId(null);
  };

  return { handleSelectTarget };
}
