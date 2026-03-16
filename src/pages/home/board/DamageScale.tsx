
import cn from "clsx";
import { useGameStore } from "../../../store/game/game.store";
import { MAX_HP } from "../../../constants/game/core.constants";

export function DamageScale() {
  const { damageBalance } = useGameStore();

  const max = MAX_HP;

  const playerSide = Math.max(0, damageBalance);
  const opponentSide = Math.max(0, -damageBalance);

  const cells = Array.from({ length: max });

  return (
    <div className="flex items-center justify-center gap-3 select-none">

      <div className="flex gap-1">
        {cells.map((_, i) => (
          <div
            key={`o-${i}`}
            className={cn(
              "w-4 h-4 border border-yellow-500",
              {
                "bg-yellow-400": i < opponentSide
              }
            )}
          />
        ))}
      </div>

      <div className="text-2xl">
        ⚖️
      </div>

      <div className="flex gap-1">
        {cells.map((_, i) => (
          <div
            key={`p-${i}`}
            className={cn(
              "w-4 h-4 border border-green-500",
              {
                "bg-green-400": i < playerSide
              }
            )}
          />
        ))}
      </div>

    </div>
  );
}