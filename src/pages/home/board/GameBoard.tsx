import { useGameStore } from "../../../store/game/game.store";
import { PlayerInfo } from "./player-info/PlayerInfo";
import { HandCard } from "./hand-card/HandCard";
import { MAX_MANA } from "../../../constants/game/core.constants";
import { PlayerMana } from "./player-info/mana/PlayerMana";
import { AudioPlayer } from "./audi-player/AudioPlayer";
import EndTurnButton from "./EndTurnButton";
import { SectionSide } from "./SectionSide";
import { GridBoardCards } from "./board-card/GridBoardCards";

export function GameBoard() {
  const { player, opponent, playCard } = useGameStore();

  const playerHand = player.deck
    .filter((card) => card.isOnHand)

  const opponentHand = opponent.deck
    .filter((card) => card.isOnHand)
    
  return (
    <div className="relative h-screen w-full">
      {/* верхняя часть */}
      <SectionSide isPlayer={false}>
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <PlayerMana
            currentMana={opponent.mana}
            maxMana={MAX_MANA}
            typePlayer="opponent"
          />

          <div className="absolute -top-[8vh] w-full">
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
          </div>

          {/* preview */}
          <div className="flex gap-3 items-center justify-center mt-[4vh]">
            <GridBoardCards isPlayerSide={false}/>
          </div>

          {/* opponent board */}
          <div className="flex gap-3 pb-5 mt-1 items-center justify-center">
            <GridBoardCards deck={opponent.deck} isPlayerSide={false}/>
          </div>
        </div>
      </SectionSide>

      <div className="absolute top-[54%] left-0 w-full">
        <div className="border-t border-yellow-500 opacity-60 w-11/12"></div>
        <EndTurnButton />
      </div>

      <SectionSide isPlayer>
        {/* player board */}
        <div className="flex gap-3 items-center justify-center">
          <GridBoardCards deck={player.deck} isPlayerSide={true}/>
        </div>

        <PlayerInfo player={player} typePlayer="player" />
        <PlayerMana
          currentMana={player.mana}
          maxMana={MAX_MANA}
          typePlayer="player"
        />

        <AudioPlayer />

        {/* рука игрока */}
        <div className="absolute -bottom-[5px] w-full">
          <div className="flex items-center justify-center">
            {playerHand.map((card, index, array) => (
              <HandCard
                key={card.id}
                card={card}
                arrayLength={array.length}
                onClick={() => playCard(card.id)}
                isDisabled={player.mana < card.mana}
              />
            ))}
          </div>
        </div>
      </SectionSide>
    </div>
  );
}
