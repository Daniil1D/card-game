import type { IGameCard, IGameStore } from "../game.types";

export const getCardById = (cardId: number, deck: IGameCard[]) => deck.find(card => card.id === cardId)

export const attackCardAction = (state: IGameStore, attackerId: number, targetId: number) => {
    const isAttackerPlayer = state.currentTurn === 'player'

    const attacker = getCardById(attackerId, isAttackerPlayer ? state.player.deck : state.opponent.deck)

    const target = getCardById(targetId, isAttackerPlayer ? state.opponent.deck : state.player.deck)

    if(attacker && target && attacker.isCanAttack) {//если карты на доске
        target.health -= attacker.attack;//нанести урон
        attacker.isCanAttack = false;//нельзя атаковать

        if(target.health <= 0){//если убита
                if(isAttackerPlayer){//если это player
                    state.opponent.deck = state.opponent.deck.filter(card => card.id !== target.id)//то у оппонента убираем карту
                } else {//если это opponent
                    state.player.deck = state.player.deck.filter(card => card.id !== target.id)//то у player убираем карту
                }
            }
        }

    return { player: state.player, opponent: state.opponent }
}