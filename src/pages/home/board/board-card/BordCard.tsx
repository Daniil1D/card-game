import { useGameStore } from "../../../../store/game/game.store";
import type { IGameCard } from "../../../../store/game/game.types";
import cn from "clsx";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSelectAttacker } from "../../../../store/game/select-attacker";
import { motion } from "framer-motion";

interface Props {
  card: IGameCard;
  isPlayerSide: boolean;
}

export function BordCard({ card, isPlayerSide }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const { returnCard, currentTurn } = useGameStore();

  const { cardAttackerId, setCardAttackerId } = useSelectAttacker();

  const handleClick = (cardId: number) => {
    if (currentTurn === "opponent") return;
    
    if (isPlayerSide) {
      if (card?.isCanAttack) {
        setCardAttackerId(cardId);
      } else if (card.isPlayedThisTurn) {
        returnCard(cardId);
      }
    } else {
      handleSelectTarget(cardId);
    }
  };

  const isPlayerSelectAttacker = isPlayerSide && cardAttackerId === card?.id

  return (
    <motion.button
      onClick={() => handleClick(card.id)}
      className={
        card
          ? cn(
              "w-[100px] h-[160px] rounded-lg",
              {
                "border-2 border-solid transition-colors": isPlayerSide && currentTurn === "player",
                "border-transparent": !card.isCanAttack,
                "cursor-pointer border-green-400": card.isCanAttack && !isPlayerSelectAttacker && isPlayerSide && currentTurn === "player",
                "border-primary shadow-2xl": isPlayerSelectAttacker
              },
            )
          : `
            w-[100px] h-[160px]
            border-2 
            rounded-lg
            border-yellow-500
            flex items-center justify-center
            shadow-md
            `
      }
      initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 150, mass: 1 }}
      // transition={{ type: 'spring', stiffness: 150, demping: 20, mass: 1 }}
    >
      {card ? (
        <img
          src={card.imageUrl}
          alt={card.name}
          draggable={false}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <img src="assets/cards/cover2.png" />
      )}
    </motion.button>
  );
}
