import { Action } from '../action/action';

export interface Player {
  id: number;
  name: string;
  hp: number;
  actions: Action[];
}

export function fromPlayerEntity(id: number, entity: any): Player {
  return {
    id,
    name: entity.components.Common.name,
    hp: entity.components.Player?.hp || 25,
    actions: [],
  };
}
