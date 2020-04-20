export interface Player {
  id: string;
  name: string;
  hp: number;
}

export function fromPlayerEntity(id: string, entity: any): Player {
  return {
    id,
    name: entity.components.Common.name,
    hp: entity.components.Player?.hp || 25,
  };
}
