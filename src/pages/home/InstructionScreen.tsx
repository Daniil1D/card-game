import { Button } from "../../components/ui/button/Button";
import { Heading } from "../../components/ui/heading/Heading";

interface Props {
  onBack: () => void;
}

export function InstructionScreen({ onBack }: Props) {
  return (
    <div
      className="
      flex flex-col items-center justify-start
      gap-4 sm:gap-6
      h-screen
      p-4 sm:p-6 md:p-10
      text-white
      overflow-y-auto
    "
    >
      <Heading>Как играть</Heading>

      <div className="max-w-[95%] sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg space-y-4">
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

        <p className="mt-6 font-bold text-base sm:text-lg md:text-xl">🔄 Ход игрока</p>

        <ul className="list-disc ml-6">
          <li>Ты можешь взять 2 карту (слева)</li>
          <li>Сыграть карты на поле</li>
          <li>Атаковать</li>
          <li>Закончить ход</li>
        </ul>

        <p className="mt-6 font-bold text-base sm:text-lg md:text-xl">🧩 Как играть карту</p>

        <ul className="list-disc ml-6">
          <li>Нажми на карту в руке</li>
          <li>Нажми на свободное место на поле</li>
        </ul>

        <p className="mt-6 font-bold text-base sm:text-lg md:text-xl">⚔️ Атака</p>

        <ul className="list-disc ml-6">
          <li>Нажми на свою карту</li>
          <li>Потом на врага или карту напротив</li>
        </ul>

        <p>💥 Если перед картой нет врага — урон идёт в героя</p>

        <p className="mt-6 font-bold text-base sm:text-lg md:text-xl">🩸 Жертва</p>

        <ul className="list-disc ml-6">
          <li>ПКМ (правая кнопка мыши) по своей карте</li>
          <li>Ты получаешь +1 мана</li>
        </ul>

        <p className="mt-6 font-bold text-base sm:text-lg md:text-xl">💡 Совет</p>

        <p>Используй белок (0 маны) как жертву, чтобы ставить сильные карты!</p>
      </div>

      <Button
        variant="primary"
        onClick={onBack}
        className="mt-4 sm:mt-6 md:mt-8 w-full sm:w-auto"
      >
        Назад
      </Button>
    </div>
  );
}