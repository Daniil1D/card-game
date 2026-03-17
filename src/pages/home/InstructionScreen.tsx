import { Button } from "../../components/ui/button/Button";
import { Heading } from "../../components/ui/heading/Heading";

interface Props {
  onBack: () => void;
}

export function InstructionScreen({ onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-start gap-6 h-screen p-10 text-white overflow-y-auto">
      
      <Heading>Как играть</Heading>

      <div className="max-w-3xl text-lg space-y-4">
        <p>🎯 Цель игры — нанести 15 урона противнику.</p>

        <p>⚖️ Весы в центре показывают баланс урона:</p>
        <ul className="list-disc ml-6">
          <li>Если перевес у тебя → ты побеждаешь</li>
          <li>Если у противника → ты проигрываешь</li>
        </ul>

        <p>🃏 У тебя есть карты с:</p>
        <ul className="list-disc ml-6">
          <li>Синяя цифра — мана</li>
          <li>Жёлтая — атака</li>
          <li>Красная — здоровье</li>
        </ul>

        <p className="mt-6 font-bold text-xl">🔄 Ход игрока</p>

        <ul className="list-disc ml-6">
          <li>Ты можешь взять 1 карту (слева)</li>
          <li>Сыграть карты на поле</li>
          <li>Атаковать</li>
          <li>Закончить ход</li>
        </ul>

        <p className="mt-6 font-bold text-xl">🧩 Как играть карту</p>

        <ul className="list-disc ml-6">
          <li>Нажми на карту в руке</li>
          <li>Нажми на свободное место на поле</li>
        </ul>

        <p className="mt-6 font-bold text-xl">⚔️ Атака</p>

        <ul className="list-disc ml-6">
          <li>Нажми на свою карту</li>
          <li>Потом на врага или карту напротив</li>
        </ul>

        <p>💥 Если перед картой нет врага — урон идёт в героя</p>

        <p className="mt-6 font-bold text-xl">🩸 Жертва</p>

        <ul className="list-disc ml-6">
          <li>ПКМ (правая кнопка мыши) по своей карте</li>
          <li>Ты получаешь +1 мана</li>
        </ul>

        {/* <p className="mt-6 font-bold text-xl">🧬 Типы карт</p>

        <ul className="list-disc ml-6">
          <li>🕊 Flying — игнорирует карту впереди</li>
          <li>☠ Poison — убивает за 1 удар</li>
          <li>🩸 Sacrifice — даёт ману</li>
          <li>👑 Legendary — только 1 в колоде</li>
          <li>😡 Berserk — усиливается после убийства</li>
          <li>🕷 Spawn — создаёт существо после смерти</li>
        </ul> */}

        <p className="mt-6 font-bold text-xl">💡 Совет</p>

        <p>Используй белок (0 маны) как жертву, чтобы ставить сильные карты!</p>
      </div>

      <Button variant="primary" onClick={onBack}>
        Назад
      </Button>
    </div>
  );
}