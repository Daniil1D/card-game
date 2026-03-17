interface Props {
  type?: string;
}

export function CardAbilityIcon({ type }: Props) {
  if (!type) return null;

  const abilityMap = {
    poison: {
      icon: "☠",
      text: "Убивает любую карту за 1 удар"
    },
    berserk: {
      icon: "🔥",
      text: "Получает +1 к атаке после убийства"
    },
    shield: {
      icon: "🛡",
      text: "Блокирует следующий полученный урон"
    },
  } as const;

  const ability = abilityMap[type as keyof typeof abilityMap];

  if (!ability) return null;

  return (
    <div
      className="
        absolute
        top-[8px]
        right-[8px]
        w-6
        h-6
        rounded-full
        bg-black/70
        flex
        items-center
        justify-center
        text-sm
        z-30
        cursor-help
      "
      title={ability.text}
    >
      {ability.icon}
    </div>
  );
}