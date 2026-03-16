import { create } from "zustand";

interface SelectedHandCardState {
  selectedCardId: string | null;

  setSelectedCardId: (id: string | null) => void;
  
  toggleSelectedCardId: (id: string) => void;
}

export const useSelectedHandCard = create<SelectedHandCardState>((set, get) => ({
  selectedCardId: null,

  setSelectedCardId: (id) => set({ selectedCardId: id }),

  toggleSelectedCardId: (id) => {
    const { selectedCardId } = get();

    if (selectedCardId === id) {
      set({ selectedCardId: null });
    } else {
      set({ selectedCardId: id });
    }
  },
}));