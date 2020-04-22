export interface Action {
  id: number;
  name: string;
  minInputCount: number;
  maxInputCount: number;
  allowedInputs: number[];
}

export function fromActionEntity(id: number, entity: any): Action {
  return {
    id,
    name: entity.components.Common.name,
    minInputCount: entity.components.Action.minInputCount || 0,
    maxInputCount: entity.components.Action.maxInputCount || 0,
    allowedInputs: entity.components.Action.allowedInputs || [],
  };
}
