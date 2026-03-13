import { CARDS } from "../../../../constants/game/cards.constants";
import type { IGameCard } from "../../game.types";

export function createDeck(): IGameCard[] {
    return CARDS.map((card, index) => ({
        ...card,
        id: index + 1,
        isTaken: false,
        isOnHand: false,
        isOnBoard: false,
        isCanAttack: false
    }))
}