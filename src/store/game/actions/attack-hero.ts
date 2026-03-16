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
            state.isGameOver = true
            state.isGameStarted = false

            useNotificationStore
                .getState()
                .show('Ты выйграл', 'win')
        }

        if (state.damageBalance <= -6) {
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