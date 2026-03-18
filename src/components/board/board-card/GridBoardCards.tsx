// 📁 src/components/board/board-card/GridBoardCards.tsx

import { MAX_BOARD_CARDS } from "../../../constants/game/core.constants";
import { useGameStore } from "../../../store/game/game.store";
import type { IGameCard } from "../../../store/game/game.types";
import { useSelectAttacker } from "../../../store/game/select-attacker";
import { useSelectedHandCard } from "../../../store/game/selected-hand-card.store";
import { BordCard } from "./BordCard";

interface Props {
  deck?: IGameCard[];
  isPlayerSide: boolean;
  isPreviewRow?: boolean;
}

export function GridBoardCards({
  deck = [],
  isPlayerSide,
  isPreviewRow,
}: Props) {
  const { selectedCardId, setSelectedCardId } = useSelectedHandCard();
  const { playCard } = useGameStore();
  const { cardAttackerId } = useSelectAttacker();

  const boardCards = deck
    .filter((card) => {
      if (isPreviewRow) return card.previewBoardIndex !== undefined;
      return card.isOnBoard;
    })
    .sort((a, b) => {
      const indexA = isPreviewRow
        ? (a.previewBoardIndex ?? 0)
        : (a.boardIndex ?? 0);
      const indexB = isPreviewRow
        ? (b.previewBoardIndex ?? 0)
        : (b.boardIndex ?? 0);
      return indexA - indexB;
    });

  const attackerCard = deck.find((card) => card.id === cardAttackerId);
  const attackerBoardIndex = attackerCard?.boardIndex;

  return (
    <div
      className="
        flex 
        flex-wrap                 /* 🔥 перенос строк */
        gap-1 sm:gap-2 md:gap-3  /* 🔥 адаптивный gap */
        items-center 
        justify-center
        max-w-full               /* 🔥 не вылазим */
      "
    >
      {Array.from({ length: MAX_BOARD_CARDS }).map((_, index) => (
        <BordCard
          key={"board-" + index}
          card={boardCards.find((card) =>
            isPreviewRow
              ? card.previewBoardIndex === index
              : card.boardIndex === index,
          )}
          isPlayerSide={isPlayerSide}
          boardIndex={index}
          isAttackTarget={
            !isPlayerSide &&
            attackerBoardIndex !== undefined &&
            attackerBoardIndex === index
          }
          canPlaceCard={isPlayerSide && selectedCardId !== null}
          onPlaceCard={() => {
            if (
              !boardCards.find((card) =>
                isPreviewRow
                  ? card.previewBoardIndex === index
                  : card.boardIndex === index,
              ) &&
              selectedCardId
            ) {
              playCard(selectedCardId, index);
              setSelectedCardId(null);
            }
          }}
        />
      ))}
    </div>
  );
}