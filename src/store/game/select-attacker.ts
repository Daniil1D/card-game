import { create } from 'zustand';

interface IUseSelectAttacker {
    cardAttackerId: string | null
    setCardAttackerId: (id: string | null) => void
}

export const useSelectAttacker = create<IUseSelectAttacker>(set => ({
    cardAttackerId: null,
    setCardAttackerId: cardId => set({ cardAttackerId: cardId }),
}))