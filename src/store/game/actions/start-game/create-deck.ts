import { CARDS } from "../../../../constants/game/cards.constants";
import type { IGameCard, TPlayer } from "../../game.types";

export function createDeck(typePlayer: TPlayer): IGameCard[] {

    const mainCards = CARDS.filter(card => card.name !== "Squirrel")

    return mainCards.map((card, index) => ({
        ...card,
        id: index + 1 + '_' + typePlayer,
        isTaken: false,
        isOnHand: false,
        isOnBoard: false,
        isCanAttack: false,
        isPlayedThisTurn: false
    }))
}

export function createSquirrelDeck(typePlayer: TPlayer): IGameCard[] {

    const squirrelCard = CARDS.find(card => card.name === "Squirrel")

    if (!squirrelCard) return []

    return new Array(10).fill(0).map((_, index) => ({
        ...squirrelCard,
        id: `squirrel_${index}_${typePlayer}`,
        isTaken: false,
        isOnHand: false,
        isOnBoard: false,
        isCanAttack: false,
        isPlayedThisTurn: false
    }))
}