import type { IGameFnStore, IGameStore, IHero } from "./game.types"

export const initialPlayerData: IHero = {
    health: 20,
    mana: 1,
    deck: [],
    squirrelDeck: []
}

export const initiaGameData: Omit<IGameStore, keyof IGameFnStore> = {
    player: initialPlayerData,
    opponent: initialPlayerData,
    currentTurn: "opponent",
    isGameOver: false,
    isGameStarted: true,
    turn: 1,
    attackingCardId: null,
    setAttackingCardId: () => {},
    damageBalance: 0,
    hasDrawnThisTurn: false,
    sacrificedThisTurn: false
}