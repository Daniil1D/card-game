import { START_HAND_CARDS, } from "../../../../constants/game/core.constants";
import type { IGameCard, IGameStore } from "../../game.types";
import { initiaGameData } from "../../initial-data";
import { createDeck, createSquirrelDeck  } from "./create-deck";
import shuffle from 'lodash/shuffle';

const getFirstCards = (
    deck: IGameCard[],
    squirrelDeck: IGameCard[]
): { deck: IGameCard[], squirrelDeck: IGameCard[] } => {

    const updatedDeck = deck.map((card, index) => ({
        ...card,
        isOnHand: index < (START_HAND_CARDS - 1),
        isTaken: index < (START_HAND_CARDS - 1),
    }))

    const updatedSquirrelDeck = squirrelDeck.map((card, index) => ({
        ...card,
        isOnHand: index === 0,
        isTaken: index === 0
    }))

    return {
        deck: updatedDeck,
        squirrelDeck: updatedSquirrelDeck
    }
}

export const startGameAction = (): Partial<IGameStore> => {

    const playerInitialDeck = shuffle(createDeck('player'));
    const playerSquirrelDeck = createSquirrelDeck('player');
    const opponentInitialDeck = shuffle(createDeck('opponent'));

    const playerCards = getFirstCards(playerInitialDeck, playerSquirrelDeck)

    return { 
        ...initiaGameData,
        player: { 
            ...initiaGameData.player, 
            deck: playerCards.deck,
            squirrelDeck: playerCards.squirrelDeck
        },
        opponent: {
            ...initiaGameData.opponent,
            deck: opponentInitialDeck.map((card, index) => ({
                ...card,
                isOnHand: index < START_HAND_CARDS,
                isTaken: index < START_HAND_CARDS,
            })),
        },
    }
};