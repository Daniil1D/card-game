import { START_HAND_CARDS, } from "../../../../constants/game/core.constants";
import type { IGameCard, IGameStore } from "../../game.types";
import { initiaGameData } from "../../initial-data";
import { createDeck, createSquirrelDeck  } from "./create-deck";
import shuffle from 'lodash/shuffle';

const getFirstCards = (deck: IGameCard[]): IGameCard[] => deck.map((card, 
    index) => ({
        ...card,
        isOnHand: index < START_HAND_CARDS,
        isTaken: index < START_HAND_CARDS,
    }))

export const startGameAction = (): Partial<IGameStore> => {

    const playerInitialDeck = shuffle(createDeck('player'));
    const playerSquirrelDeck = createSquirrelDeck('player');
    const opponentInitialDeck = shuffle(createDeck('opponent'));

    return { 
        ...initiaGameData,
        player: { 
            ...initiaGameData.player, 
            deck: getFirstCards(playerInitialDeck),
            squirrelDeck: playerSquirrelDeck
        },
        opponent: { 
            ...initiaGameData.opponent, 
            deck: getFirstCards(opponentInitialDeck),
        }
    }
};