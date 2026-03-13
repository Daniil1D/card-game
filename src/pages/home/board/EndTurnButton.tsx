import { Button } from "../../../components/ui/button/Button";
import { useGameStore } from "../../../store/game/game.store";

export default function EndTurnButton() {
  const { endTurn, currentTurn } = useGameStore();

  const isOpponentTurn = currentTurn === "opponent";

  return (
    <Button
      className="absolute -top-[30px] right-4 z-10"
      onClick={endTurn}
      variant="primary"
      // onClick={isOpponentTurn ? () => null : endTurn}
      // variant={isOpponentTurn ? "disabled" : "primary"}
      // disabled={isOpponentTurn}
    >
      Конец хода
    </Button>
  );
}
