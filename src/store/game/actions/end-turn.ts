import { MAX_MANA } from "../../../constants/game/core.constants";
import { useNotificationStore } from "../../notification/notification.store";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";
import { drawCardsAction } from "./draw-cards";

const getNewMana = (currentTurn: number) => {
    return Math.min(currentTurn, MAX_MANA) 
}//функция для получения нового количества маны

const updateCardOnTheEndTurn = (deck: IGameCard[]) => deck.map(card => ({
    ...card,
    isCanAttack: card.isOnBoard,
    isPlayedThisTurn: false
}))

export const endTurnAction = (state: IGameStore): Partial<IGameStore> => {
    const newTurn:TPlayer = state.currentTurn === "player" ? "opponent" : "player"//новый ход

    const isNewTurnPlayer = newTurn === 'player'

    if (!isNewTurnPlayer) {
        state.opponent.deck.forEach(card => {
            if (card.previewBoardIndex !== undefined) {
                // проверяем свободен ли слот во втором ряду
                const slotTaken = state.opponent.deck.find(
                    c => c.boardIndex === card.previewBoardIndex && c.health > 0
                );

                if (!slotTaken) { // ✅ перенос только если слот пустой
                    card.boardIndex = card.previewBoardIndex;
                    card.previewBoardIndex = undefined;
                    card.isOnBoard = true;
                    card.isCanAttack = true;
                }
                // иначе карта остаётся в preview row
            }
        })
    }

    const newTurnNumber = isNewTurnPlayer ? state.turn + 1 : state.turn

    let newPlayerMana = state.player.mana
    let newOpponentMana = state.opponent.mana

    if(isNewTurnPlayer) {
        newPlayerMana = getNewMana(newTurnNumber)
        useNotificationStore.getState().show('Ваш ход')
    } else {
        newOpponentMana = getNewMana(newTurnNumber)
    }


    const updatedState = {
        ...state,
        currentTurn: newTurn,
        player: {
            ...state.player,
            mana: newPlayerMana,
            deck: updateCardOnTheEndTurn(state.player.deck)
        },
        opponent: {
            ...state.opponent,
            mana: newOpponentMana,
            deck: updateCardOnTheEndTurn(state.opponent.deck)
        },
        turn: newTurnNumber
    }

    if(!isNewTurnPlayer){
        updatedState.opponent = {
            ...updatedState.opponent,
            deck: drawCardsAction(updatedState.opponent).updatedDeck
        }
    }  else {
            updatedState.player = {
                ...updatedState.player,
                deck: drawCardsAction(updatedState.player).updatedDeck
            }
    }

    return updatedState
}