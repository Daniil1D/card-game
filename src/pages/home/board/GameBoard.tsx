import { useGameStore } from "../../../store/game/game.store";
import { PlayerInfo } from "../../../components/board/player-info/PlayerInfo";
import { HandCard } from "../../../components/board/hand-card/HandCard";
import { MAX_MANA } from "../../../constants/game/core.constants";
import { PlayerMana } from "../../../components/board/player-info/mana/PlayerMana";
import { AudioPlayer } from "../../../components/board/audi-player/AudioPlayer";
import EndTurnButton from "./EndTurnButton";
import { SectionSide } from "./SectionSide";
import { useSelectedHandCard } from "../../../store/game/selected-hand-card.store";
import { DamageScale } from "./DamageScale";
import { GridBoardCards } from "../../../components/board/board-card/GridBoardCards";

export function GameBoard() {
  const {
    player,
    opponent,
    currentTurn,
    drawFromMainDeck,
    drawFromSquirrelDeck,
  } = useGameStore();

  const { toggleSelectedCardId } = useSelectedHandCard();

  const playerHand = [...player.deck, ...player.squirrelDeck].filter(
    (card) => card.isOnHand,
  );

  return (
    <div className="relative h-screen w-full">
      <SectionSide isPlayer={false}>
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <PlayerMana
            currentMana={opponent.mana}
            maxMana={MAX_MANA}
            typePlayer="opponent"
          />

          <DamageScale />

          {/* <div className="absolute -top-[8vh] w-full">
            <div className="flex items-center justify-center">
              {opponentHand.map((card, index, array) => (
                <HandCard
                  key={card.id}
                  card={card}
                  arrayLength={array.length}
                  isHided
                />
              ))}
            </div>
          </div> */}

          <div className="flex gap-3 items-center justify-center">
            <GridBoardCards
              deck={opponent.deck}
              isPlayerSide={false}
              isPreviewRow
            />
          </div>

          <div className="flex gap-3 pb-5 mt-1 items-center justify-center">
            <GridBoardCards deck={opponent.deck} isPlayerSide={false} />
          </div>
        </div>
      </SectionSide>

      <div className="absolute top-[54%] left-0 w-full">
        <div className="border-t border-yellow-500 opacity-60 w-11/12"></div>
        <EndTurnButton />
      </div>

      <SectionSide isPlayer>
        <div className="flex gap-3 items-center justify-center">
          <GridBoardCards deck={player.deck} isPlayerSide={true} />
        </div>

        <PlayerInfo player={player} typePlayer="player" />
        <PlayerMana
          currentMana={player.mana}
          maxMana={MAX_MANA}
          typePlayer="player"
        />

        <AudioPlayer />

        <div
          className="absolute left-[200px] -translate-x-1/2bottom-[140px]flex gap-3 sm:gap-4 md:gap-">
          <button
            onClick={() => {
              if (currentTurn === "player") {
                drawFromMainDeck();
              }
            }}
            className="w-[60px] h-[90px] sm:w-[75px] sm:h-[115px] md:w-[90px] md:h-[140px] rounded-lg overflow-hidden hover:scale-105 transition shadow-lg"
          >
            <img
              src="/assets/cards/cover.png"
              className="w-full h-full object-cover"
            />
          </button>

          <button
            onClick={() => {
              if (currentTurn === "player") {
                drawFromSquirrelDeck();
              }
            }}
            className="w-[60px] h-[90px] sm:w-[75px] sm:h-[115px] md:w-[90px] md:h-[140px] rounded-lg overflow-hidden hover:scale-105 transition shadow-lg"
          >
            <img
              src="/assets/cards/squirrel.png"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        <div className="absolute -bottom-[5px] w-full">
          <div className="flex items-center justify-center">
            {playerHand.map((card, _, array) => (
              <HandCard
                key={card.id}
                card={card}
                arrayLength={array.length}
                onClick={() => {
                  if (currentTurn === "player") {
                    toggleSelectedCardId(card.id);
                  }
                }}
                isDisabled={
                  player.mana < card.mana || currentTurn === "opponent"
                }
              />
            ))}
          </div>
        </div>
      </SectionSide>
    </div>
  );
}
