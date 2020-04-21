export interface Unit {
  id: string;
  name: string;
  strength: number;
  defense: number;
  attributes: string[];
}

export function fromUnitEntity(id: string, entity: any): Unit {
  const unit = entity.components.Unit;
  return {
    id,
    name: entity.components.Common.name,
    strength: unit.strength,
    defense: unit.defense || 0,
    attributes: Object.keys(unit).filter(key => key !== 'strength' && key !== 'defense'),
  };
}
