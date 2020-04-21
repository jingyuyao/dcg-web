export interface Action {
  id: number;
  name: string;
}

export function fromActionEntity(id: number, entity: any): Action {
  return {
    id,
    name: entity.components.Common.name,
  };
}
