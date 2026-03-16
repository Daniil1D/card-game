import type { IGameStore } from "../game.types";

export const playCardAction = (state: IGameStore, cardId: string, boardIndex: number)=> {
    const isPlayerTurn = state.currentTurn === "player"
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;

    const currentCardIndex = currentPlayer.deck.findIndex(
        card => card.id === cardId
    )

    const currentCard = currentPlayer.deck[currentCardIndex]

    if(currentCard && currentPlayer.mana >= currentCard?.mana) {
        currentCard.boardIndex = boardIndex;
        currentCard.isOnBoard = true;//положить карту на доску
        currentCard.isPlayedThisTurn = true;//установить флаг
        currentCard.isOnHand = false;//убрать карту из руки
        currentCard.isCanAttack = true;//разрешить сразу атаку
        
        currentPlayer.mana -= currentCard.mana;//уменьшить количество маны

        currentPlayer.deck.splice(currentCardIndex, 1)//убрать карту из колоды
        currentPlayer.deck.push(currentCard)//добавить карту в колоду
    }

    return { 
        player: isPlayerTurn ? currentPlayer : state.player, 
        opponent: isPlayerTurn ? state.opponent : currentPlayer 
    }
};