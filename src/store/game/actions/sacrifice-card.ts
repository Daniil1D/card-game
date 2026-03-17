import type { IGameStore } from "../game.types";

export const sacrificeCardAction = (state: IGameStore, cardId: string) => {

    if (state.currentTurn !== "player") return state;

    const card = state.player.deck.find(c => c.id === cardId);

    if (!card || !card.isOnBoard || !card.isCanAttack) return state;

    const newDeck = state.player.deck.filter(c => c.id !== cardId);

    return {
        ...state,
        player: {
            ...state.player,
            mana: state.player.mana + 1,
            deck: newDeck
        },

        sacrificedThisTurn: true
    };
};