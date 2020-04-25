import { Action } from '../action/action';

export interface Player {
  id: number;
  name: string;
  hp: number;
  flashTokens: number;
  powerPool: number;
  actions: Action[];
}

export function fromPlayerEntity(id: number, entity: any): Player {
  return {
    id,
    name: entity.components.Common.name,
    hp: entity.components.Player?.hp || 0,
    flashTokens: entity.components.Player?.flashTokens || 0,
    powerPool: entity.components.Turn?.powerPool || 0,
    actions: [],
  };
}
