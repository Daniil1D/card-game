import type { IHero, TPlayer } from "../../../store/game/game.types";
import cn from "clsx";
import { useEnemyTarget } from "../board-card/useEnemyTarget";
import { useGameStore } from "../../../store/game/game.store";
import { DamageList } from "../../../pages/home/board/DamageList";

interface Props {
  player: Omit<IHero, "deck">;
  typePlayer: TPlayer;
}
export function PlayerInfo({ typePlayer }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const isPlayer = typePlayer === "player";
  const { currentTurn } = useGameStore();
  return (
    <button
      className={cn("absolute z-[1]", {
        "bottom-0": isPlayer,
        "right-6 top-2": !isPlayer,
      })}
      disabled={isPlayer || currentTurn === "opponent"}
      onClick={() => (isPlayer ? null : handleSelectTarget(undefined, true))}
    >
      <img
        className="w-[120px] sm:w-[150px] md:w-[200px]"
        src={
          isPlayer ? "assets/heroes/player.png" : "assets/heroes/opponent.png"
        }
        alt={typePlayer}
        draggable={false}
      />
      <div
        className={cn(
          "absolute w-full flex items-center justify-center",
          isPlayer ? "bottom-4" : "bottom-5",
        )}
      >
      </div>
      <DamageList id={typePlayer} isRight={isPlayer} />
    </button>
  );
}
