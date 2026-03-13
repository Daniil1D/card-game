import type { IGameFnStore, IGameStore, IHero } from "./game.types"

export const initialPlayerData: IHero = {
    health: 6,
    mana: 1,
    deck: [],
}

export const initiaGameData: Omit<IGameStore, keyof IGameFnStore> = {
    player: initialPlayerData,
    opponent: initialPlayerData,
    currentTurn: "player",
    isGameOver: false,
    isGameStarted: true,
    turn: 1
}