import { MAX_BOARD_CARDS } from "../../../../constants/game/core.constants";
import type { IGameCard } from "../../../../store/game/game.types";
import { BordCard } from "./BordCard";

interface Props {
    deck?: IGameCard[];
    isPlayerSide: boolean
}
export function GridBoardCards({ deck = [], isPlayerSide }: Props) {

  const boardCards = deck
    .filter((card) => card.isOnBoard)
    .slice(0, MAX_BOARD_CARDS)

  return (
    <div className="flex gap-3 items-center justify-center">
      {Array.from({ length: MAX_BOARD_CARDS }).map((_, index) => (
        <BordCard
          key={"board-" + index}
          card={boardCards[index]}
          isPlayerSide={isPlayerSide}
        />
      ))}
    </div>
  );
}