import { MAX_MANA } from "../../../constants/game/core.constants";
import { useNotificationStore } from "../../notification/notification.store";
import type { IGameCard, IGameStore, TPlayer } from "../game.types";

const getNewMana = (currentTurn: number) => {

    const maxMana = MAX_MANA;

    const mana = currentTurn % maxMana;

    return mana === 0 ? maxMana : mana;
}

const updateCardOnTheEndTurn = (deck: IGameCard[]) => deck.map(card => ({
    ...card,
    isCanAttack: card.isOnBoard,
    isPlayedThisTurn: false
}))

export const endTurnAction = (state: IGameStore): Partial<IGameStore> => {
    const newTurn:TPlayer = state.currentTurn === "player" ? "opponent" : "player"

    const isNewTurnPlayer = newTurn === 'player'

    if (!isNewTurnPlayer) {
        state.opponent.deck.forEach(card => {
            if (card.previewBoardIndex !== undefined) {
                const slotTaken = state.opponent.deck.find(
                    c => c.boardIndex === card.previewBoardIndex && c.health > 0
                );

                if (!slotTaken) {
                    card.boardIndex = card.previewBoardIndex;
                    card.previewBoardIndex = undefined;
                    card.isOnBoard = true;
                    card.isCanAttack = true;
                }
            }
        })
    }

    const newTurnNumber = isNewTurnPlayer ? state.turn + 1 : state.turn

    let newPlayerMana = state.player.mana
    let newOpponentMana = state.opponent.mana

    if(isNewTurnPlayer) {
        newPlayerMana = state.player.mana
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

    return {
        ...updatedState,
        drawCountThisTurn: 0,

        sacrificedThisTurn: false
    }
}