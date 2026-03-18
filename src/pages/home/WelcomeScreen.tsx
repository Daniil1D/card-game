// 📁 src/pages/home/WelcomeScreen.tsx

import { useState, useTransition } from "react";
import { Button } from "../../components/ui/button/Button";
import { Heading } from "../../components/ui/heading/Heading";
import { useGameStore } from "../../store/game/game.store";
import { Loader } from "../../components/ui/loader/Loader";
import { InstructionScreen } from "./InstructionScreen";

export function WelcomeScreen() {
  const [isPending, startTransition] = useTransition();
  const { startGame } = useGameStore();
  const [showInstructions, setShowInstructions] = useState(false);

  const onCLick = () => {
    startTransition(() => {
      startGame();
    });
  };

  if (showInstructions) {
    return <InstructionScreen onBack={() => setShowInstructions(false)} />;
  }

  return (
    <div
      className="
      flex items-center justify-center flex-col
      gap-3 sm:gap-4 md:gap-6
      h-screen
      px-4
    "
    >
      <Heading>Start Game</Heading>

      <Button
        variant="primary"
        onClick={onCLick}
        className="w-full sm:w-[200px]"
      >
        {isPending ? <Loader /> : "Start game"}
      </Button>

      <Button
        variant="secondary"
        onClick={() => setShowInstructions(true)}
        className="w-full sm:w-[200px]"
      >
        Инструкция
      </Button>
    </div>
  );
}