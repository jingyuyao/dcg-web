export interface Card {
  id: string;
  name: string;
  cost: number;
}

export function fromCardEntity(id: string, entity: any): Card {
  return {
    id,
    name: entity.components.Common.name,
    cost: entity.components.Card?.cost || 0,
  };
}
