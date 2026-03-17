import { create } from "zustand";
import { type IGameStore } from "./game.types";
import { endTurnAction } from "./actions/end-turn";
import { playCardAction } from "./actions/play-card";
import { attackCardAction } from "./actions/attack-card";
import { attackHeroAction } from "./actions/attack-hero";
import { returnCardAction } from "./actions/return-card";
import { initiaGameData } from "./initial-data";
import { startGameAction } from "./actions/start-game/start-game";
import { randomOpponentPlay } from "./actions/opponent-core-game/random-opponent-play";
import { drawFromMainDeckAction } from "./actions/draw-from-main-deck";
import { drawFromSquirrelDeckAction } from "./actions/draw-from-squirrel-deck";
import { sacrificeCardAction } from "./actions/sacrifice-card";

const useGameStore = create<IGameStore>((set) => ({
    ...initiaGameData,
    isGameStarted: false,
    attackingCardId: null as string | null,
    startGame: () => {
        set(startGameAction)

        setTimeout(() => {
            set(state => {
                const updatedState = randomOpponentPlay(state)

                setTimeout(() => {
                    set(() => endTurnAction(updatedState))
                }, 2500)

                return updatedState
            })
        }, 1000)
    },
    endTurn: () => {
        set(endTurnAction)

        setTimeout(() => {
            set(state => {
                const updatedState = randomOpponentPlay(state)

                setTimeout(() => {
                    set(() => endTurnAction(updatedState))
                }, 2500)

                return updatedState
            })
        }, 2500)
    },
    playCard: (cardId: string, boardIndex: number) => {
        set((state) => playCardAction(state, cardId, boardIndex))
    },
    returnCard: (cardId: string) => {
        set((state) => returnCardAction(state, cardId))
    },
    sacrificeCard: (cardId: string) => {
        set(state => sacrificeCardAction(state, cardId))
    },
    attackCard: (attackerId: string, targetId: string) => {
        set({ attackingCardId: attackerId })

        set(state => attackCardAction(state, attackerId, targetId))

        setTimeout(() => {
            set({ attackingCardId: null })
        }, 300)
    },
    attackHero: (attackerId: string) => {
        set({ attackingCardId: attackerId })

        set(state => attackHeroAction(state, attackerId))

        setTimeout(() => {
            set({ attackingCardId: null })
        }, 300)
    },
    setAttackingCardId: (id: string | null) => set({ attackingCardId: id }),
    drawFromMainDeck: () => {
        set(state => drawFromMainDeckAction(state))
    },
    drawFromSquirrelDeck: () => {
        set(state => drawFromSquirrelDeckAction(state))
    },
}))
export {useGameStore}