import { Action } from '../action/action';

export interface Card {
  id: number;
  name: string;
  cost: number;
  actions: Action[];
}

export function fromCardEntity(id: number, entity: any): Card {
  return {
    id,
    name: entity.components.Common.name,
    cost: entity.components.Card?.cost || 0,
    actions: [],
  };
}
