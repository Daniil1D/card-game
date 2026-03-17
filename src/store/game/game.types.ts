import type { ICard } from "../../types/card.types";

export type TPlayer = "player" | "opponent"
export interface IGameCard extends ICard {
    id: string
    isTaken: boolean
    isOnHand: boolean
    isOnBoard: boolean
    isCanAttack: boolean
    isPlayedThisTurn: boolean
    boardIndex?: number
    previewBoardIndex?: number
}
export interface IHero {
    health: number;
    mana: number;
    deck: IGameCard[];
    squirrelDeck: IGameCard[]
}

export interface IGameFnStore {
    startGame: () => void
    endTurn: () => void
    playCard: (cardId: string, boardIndex: number) => void
    returnCard: (cardId: string) => void
    attackCard: (attackerId: string, targetId: string) => void
    attackHero: (attackerId: string) => void
    drawFromMainDeck: () => void
    drawFromSquirrelDeck: () => void
    sacrificeCard: (cardId: string) => void
}

export interface IGameStore extends IGameFnStore {
    isGameStarted: boolean
    player: IHero
    opponent: IHero
    currentTurn: TPlayer
    isGameOver: boolean
    turn: number
    attackingCardId: string | null
    setAttackingCardId: (id: string | null) => void
    damageBalance: number
    hasDrawnThisTurn: boolean
    sacrificedThisTurn: boolean
}