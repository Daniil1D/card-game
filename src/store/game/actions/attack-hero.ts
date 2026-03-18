import { MAX_HP } from "../../../constants/game/core.constants";
import { useNotificationStore } from "../../notification/notification.store";
import { useDamageStore } from "../damage.store";
import type { IGameStore } from "../game.types";
import { getCardById } from "./attack-card";

export const attackHeroAction = (
    state: IGameStore,
    attackerId: string,
): Partial<IGameStore> => {
    const isAttackerPlayer = state.currentTurn === 'player'
    const opponent = isAttackerPlayer ? state.opponent : state.player

    const attacker = getCardById(
        attackerId,
        isAttackerPlayer ? state.player.deck : state.opponent.deck
    )

    const opponentCardInFront = opponent.deck.find(
        card => card.isOnBoard && card.boardIndex === attacker?.boardIndex
    );

    if(attacker && attacker.isCanAttack && !opponentCardInFront) {

        if (isAttackerPlayer) {
            state.damageBalance += attacker.attack
        } else {
            state.damageBalance -= attacker.attack
        }

        attacker.isCanAttack = false

        useDamageStore.getState().addDamage(isAttackerPlayer ? 'opponent' : 'player', attacker.attack)

        if (state.damageBalance >= MAX_HP) {

            if (state.phase === 1) {
                state.phase = 2
                state.damageBalance = 0

                // 🔴 АКТИВАЦИЯ СПОСОБНОСТИ
                if (!state.opponentAbilityUsed && state.opponentAbility) {

                    if (state.opponentAbility === "stealCard") {
                        const playerCardsOnBoard = state.player.deck.filter(c => c.isOnBoard)

                        if (playerCardsOnBoard.length > 0) {
                            const randomIndex = Math.floor(Math.random() * playerCardsOnBoard.length)
                            const stolenCard = playerCardsOnBoard[randomIndex]

                            state.player.deck = state.player.deck.filter(c => c.id !== stolenCard.id)

                            const takenSlots = state.opponent.deck
                                .filter(c => c.isOnBoard)
                                .map(c => c.boardIndex)

                            let freeSlot = undefined

                            for (let i = 0; i < 4; i++) {
                                if (!takenSlots.includes(i)) {
                                    freeSlot = i
                                    break
                                }
                            }

                            if (freeSlot !== undefined) {
                                stolenCard.boardIndex = freeSlot
                                stolenCard.isOnBoard = true
                                stolenCard.isOnHand = false
                            } else {
                                stolenCard.isOnHand = true
                                stolenCard.isOnBoard = false
                            }

                            state.opponent.deck.push(stolenCard)
                        }
                    }

                    if (state.opponentAbility === "boardControl") {
                        const playerCards = state.player.deck.filter(c => c.isOnBoard)

                        playerCards.forEach(card => {
                            state.player.deck = state.player.deck.filter(c => c.id !== card.id)

                            card.isOnHand = false
                            card.isOnBoard = true

                            const takenSlots = state.opponent.deck
                                .filter(c => c.isOnBoard)
                                .map(c => c.boardIndex)

                            if (takenSlots.includes(card.boardIndex!)) {
                                for (let i = 0; i < 4; i++) {
                                    if (!takenSlots.includes(i)) {
                                        card.boardIndex = i
                                        break
                                    }
                                }
                            }

                            state.opponent.deck.push(card)
                        })

                        const strongCards = state.opponent.deck.filter(c => c.attack >= 2)

                        if (strongCards.length >= 2) {
                            state.opponent.deck.push(
                                { ...strongCards[0], id: crypto.randomUUID() },
                                { ...strongCards[1], id: crypto.randomUUID() }
                            )
                        }

                        state.opponent.mana += 2
                    }

                    state.opponentAbilityUsed = true
                }

                useNotificationStore
                    .getState()
                    .show('2 ФАЗА НАЧАЛАСЬ', 'info')

            } else {
                state.isGameOver = true
                state.isGameStarted = false

                useNotificationStore
                    .getState()
                    .show('Ты выйграл', 'win')
            }
        }

        if (state.damageBalance <= -MAX_HP) {
            state.isGameOver = true
            state.isGameStarted = false

            useNotificationStore
                .getState()
                .show('Ты проиграл', 'lose')
        }
    }

    return {
        player: state.player,
        opponent: state.opponent,
        damageBalance: state.damageBalance,
        isGameOver: state.isGameOver,
        isGameStarted: state.isGameStarted
    }
}