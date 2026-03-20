import type { IGameCard } from "../../game.types";

export const getCardById = (cardId: string, deck: IGameCard[]) =>
  deck.find((card) => card.id === cardId);