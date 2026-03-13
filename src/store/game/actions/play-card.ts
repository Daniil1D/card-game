import type { IGameStore } from "../game.types";

export const playCardAction = (state: IGameStore, cardId: number): Partial<IGameStore> => {
    const isPlayerTurn = state.currentTurn === "player"
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;

    const currentCard = currentPlayer.deck.find(card => card.id === cardId);

    if(currentCard && currentPlayer.mana >= currentCard?.mana) {
        currentCard.isOnBoard = true;//положить карту на доску
        currentCard.isPlayedThisTurn = true;//установить флаг
        currentCard.isOnHand = false;//убрать карту из руки
        
        currentPlayer.mana -= currentCard.mana;//уменьшить количество маны
    }

    return isPlayerTurn ? { player: currentPlayer } : { opponent: currentPlayer }
};