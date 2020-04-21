import { Action } from '../action/action';

export interface Unit {
  id: number;
  name: string;
  description: string;
  strength: number;
  defense: number;
  attributes: string[];
  actions: Action[];
}

export function fromUnitEntity(id: number, entity: any): Unit {
  const unit = entity.components.Unit;
  return {
    id,
    name: entity.components.Common.name,
    description: entity.components.Common.description,
    strength: unit.strength,
    defense: unit.defense || 0,
    attributes: Object.keys(unit).filter(key => key !== 'strength' && key !== 'defense'),
    actions: [],
  };
}
