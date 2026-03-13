export type CardType =
  | "taunt"//Враги обязаны бить её.
  | "flying"//Карты игнорируют карту впереди.
  | "poison"//Убивает любую карту за 1 удар.
  | "sacrifice"//Карты можно жертвовать чтобы призывать сильные.
  | "legendary"//Можно иметь только 1 в колоде
  | "charge"//Атакует сразу при выходе
  | "berserk"//Получает +1 attack после убийства.
  | "spawn"//После смерти создаёт карту.

export interface ICard {
    name: string
    mana: number
    health: number
    attack: number
    type?: CardType
    imageUrl: string
}