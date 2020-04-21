import { Action } from '../action/action';

export interface Card {
  id: number;
  name: string;
  description: string;
  cost: number;
  actions: Action[];
}

export function fromCardEntity(id: number, entity: any): Card {
  return {
    id,
    name: entity.components.Common.name,
    description: entity.components.Common.description,
    cost: entity.components.Card?.cost || 0,
    actions: [],
  };
}
