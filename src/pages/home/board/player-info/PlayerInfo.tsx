import type { IHero, TPlayer } from "../../../../store/game/game.types";
import cn from "clsx";
import { Badge } from "../../../../components/ui/Badge";
import { MAX_HP } from "../../../../constants/game/core.constants";
import { useEnemyTarget } from "../board-card/useEnemyTarget";
import { useGameStore } from "../../../../store/game/game.store";

interface Props {
  player: Omit<IHero, "deck">;
  typePlayer: TPlayer;
}
export function PlayerInfo({ player, typePlayer }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const isPlayer = typePlayer === "player";
  const { currentTurn } = useGameStore();
  return (
    <button
      className={cn("absolute", {
        "bottom-0": isPlayer,
        "right-6 top-2": !isPlayer,
      })}
      disabled={isPlayer || currentTurn === "opponent"}
      onClick={() => isPlayer ? null : handleSelectTarget(undefined, true)}
    >
      <img
        width={200}
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
        <Badge value={player.health} maxValue={MAX_HP} color={"red"} />
      </div>
    </button>
  );
}
