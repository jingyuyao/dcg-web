import { Action } from '../action/action';

export interface Card {
  id: number;
  name: string;
  description: string;
  cost: number;
  strength: number;
  kind: string;
  actions: Action[];
}

export function fromCardEntity(id: number, entity: any, tags: string[]): Card {
  const components = entity.components;
  const kind = tags.includes('HasUnit') ? 'Unit' : tags.includes('Spell') ? 'Spell' : 'Basic';
  return {
    id,
    name: components.Common.name,
    description: components.Common.description,
    cost: components.Card?.cost || 0,
    strength: components.HasUnit?.strength || 0,
    kind,
    actions: [],
  };
}
