import { useGameStore } from "../../../store/game/game.store";
import { useState } from "react";

export function OpponentAbilityBadge() {
  const { opponentAbility, phase } = useGameStore();
  const [isHovered, setIsHovered] = useState(false);

  if (phase !== 2 || !opponentAbility) return null;

  const text =
    opponentAbility === "stealCard"
      ? "🩸 Кража"
      : "🔥 Контроль";

  const description =
    opponentAbility === "stealCard"
      ? "Босс крадёт одну случайную карту с твоего поля"
      : "Босс захватывает твои карты и усиливает себя";

  return (
    <div
      className="absolute top-5 right-16 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="
        bg-black/70
        text-red-400
        px-3
        py-1
        rounded-lg
        text-sm
        shadow-lg
        animate-pulse
        cursor-pointer
      ">
        {text}
      </div>

      {isHovered && (
        <div className="
          absolute
          top-full
          right-0
          mt-2
          w-[220px]
          bg-black/90
          text-white
          text-xs
          px-3
          py-2
          rounded-lg
          shadow-xl
          border border-red-500
          animate-fade-in
        ">
          {description}
        </div>
      )}
    </div>
  );
}