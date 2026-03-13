import { useNotificationStore } from "../../notification/notification.store";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";
import { drawCardsAction } from "./draw-cards";

const getNewMana = (newTurn:TPlayer, currentTurn: number) => {
    return newTurn === 'player' 
        ? Math.min(currentTurn, 6) 
        : currentTurn
}//функция для получения нового количества маны

const updateCardOnTheEndTurn = (deck: IGameCard[]) => deck.map(card => ({
    ...card,
    isCanAttack: card.isOnBoard,
    isPlayedThisTurn: false
}))//функция для сброса атак

export const endTurnAction = (get: () => IGameStore): Partial<IGameStore> => {
    const state = get()

    const newTurn:TPlayer = state.currentTurn === "player" ? "opponent" : "player"//новый ход

    const newPlayerMana = getNewMana('player', state.turn)//новое количество маны
    const newOpponentMana = getNewMana('opponent', state.turn)

    if (newTurn === 'player') {
        useNotificationStore.getState().show('Ваш ход')
    }

    return {
        currentTurn: newTurn,
        player: {
            ...state.player,
            mana: newPlayerMana,
            deck: updateCardOnTheEndTurn(newTurn === 'player' ? drawCardsAction(state).updatedDeck :  state.player.deck)
        },
        opponent: {
            ...state.opponent,
            mana: newOpponentMana,
            deck: updateCardOnTheEndTurn(newTurn === 'opponent' ? drawCardsAction(state).updatedDeck :  state.opponent.deck)
        },
        turn: state.turn + 1
    }
}