import { useGameStore } from "../../../../store/game/game.store";
import type { IGameCard } from "../../../../store/game/game.types";
import cn from "clsx";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSelectAttacker } from "../../../../store/game/select-attacker";
import { motion } from "framer-motion";
import { DamageList } from "../DamageList";

interface Props {
  card?: IGameCard;
  isPlayerSide: boolean;
  boardIndex?: number;
  canPlaceCard?: boolean;
  onPlaceCard?: () => void;
  isAttackTarget?: boolean;
}

export function BordCard({
  card,
  isPlayerSide,
  canPlaceCard,
  onPlaceCard,
  isAttackTarget
}: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const { returnCard, currentTurn, attackingCardId, sacrificeCard } = useGameStore();

  const { cardAttackerId, setCardAttackerId } = useSelectAttacker();

  const handleClick = (cardId?: string) => {
    if (currentTurn === "opponent") return;

    if (!card && canPlaceCard && onPlaceCard) {
      onPlaceCard();
      return;
    }

    if (isPlayerSide) {
      if (card?.isCanAttack && cardId !== undefined) {

        if(cardAttackerId == cardId) {
          setCardAttackerId(null)
          return
        }

        setCardAttackerId(cardId);

      } else if (card?.isPlayedThisTurn) {

        if (cardId) returnCard(cardId);
        
      }
    } else {
      handleSelectTarget(cardId);
    }
  };

  const handleRightClick = (event: React.MouseEvent, cardId?: string) => {
    event.preventDefault();

    if (!cardId) return;
    if (!isPlayerSide) return;
    if (currentTurn !== "player") return;
    if (!card) return;
    if (!card.isOnBoard) return;

    sacrificeCard(cardId);
  };

  const isPlayerSelectAttacker = isPlayerSide && cardAttackerId === card?.id;

  return (
    <motion.button
      onClick={() => handleClick(card?.id)}
      onContextMenu={(e) => handleRightClick(e, card?.id)}
      className={
        card
          ? cn("w-[100px] h-[160px] rounded-lg relative overflow-hidden", {
              "border-red-500 shadow-[0_0_20px_#ef4444] border-2":
                isAttackTarget && !isPlayerSide,
              "border-2 border-solid transition-colors":
                isPlayerSide && currentTurn === "player",
              "border-transparent": !card.isCanAttack,
              "cursor-pointer border-green-400":
                card.isCanAttack &&
                !isPlayerSelectAttacker &&
                isPlayerSide &&
                currentTurn === "player",
              "border-primary shadow-[0_0_20px_#22c55e]":
                isPlayerSelectAttacker,
            })
          : cn(
              `
            w-[100px] h-[160px]
            border-2 
            rounded-lg
            border-yellow-500
            flex items-center justify-center
            shadow-md
            `,
              {
                "border-green-400 bg-green-900/20 cursor-pointer": canPlaceCard,

                "border-yellow-500": !canPlaceCard,
              },
            )
      }
      {...(card ? { whileHover: { scale: 1.08 } } : {})}
      initial={{ scale: 0.5, rotate: -15, y: -200, opacity: 0 }}
      animate={
        attackingCardId === card?.id
          ? { y: -40, scale: 1.05 }
          : { scale: 1, rotate: 0, y: 0, opacity: 1 }
      }
      transition={{ type: "spring", stiffness: 150, mass: 1 }}
      // transition={{ type: 'spring', stiffness: 150, demping: 20, mass: 1 }}
    >
      {card ? (
        <div className="relative w-full h-full">
          <img
            src={card.imageUrl}
            alt={card.name}
            draggable={false}
            className="
              absolute
              top-[0%]
              left-[0%]
              w-[100%]
              h-[100%]
              object-cover
              rounded-sm
              z-20
              "
          />
          <DamageList id={card.id} isRight />
          <div
            className="
              absolute
              inset-0
              z-10
              pointer-events-none
              bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]
            "
          />
          <div
            className="
          absolute
          top-[10px]
          left-[10.2px]
          w-[13.7px]
          h-[13.7px]
          rounded-full
          bg-[#031d6b]
          text-white
          flex
          items-center
          justify-center
          text-xs
          font-bold
          z-20
        "
          >
            {card.mana}
          </div>

          <div
            className="
        absolute
        bottom-[21px]
        left-[11px]
        w-3.5
        h-3.5
        rounded-full
        bg-[#835804]
        text-white
        flex
        items-center
        justify-center
        text-xs
        font-bold
        shadow-2xl
        z-20
      "
          >
            {card.attack}
          </div>

          <div
            className="
        absolute
        bottom-[21px]
        right-[9.8px]
        w-3.5
        h-3.5
        rounded-full
        bg-[#830f04]
        text-white
        flex
        items-center
        justify-center
        text-xs
        font-bold
        z-20
      "
          >
            {card.health}
          </div>
        </div>
      ) : (
        <img src="/assets/cards/cover2.png" />
      )}
    </motion.button>
  );
}
