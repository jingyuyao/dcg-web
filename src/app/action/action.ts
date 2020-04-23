export interface Action {
  id: number;
  name: string;
  canTrigger: boolean;
  minInputCount: number;
  maxInputCount: number;
  allowedTargets: number[];
}

export function fromActionEntity(id: number, entity: any): Action {
  return {
    id,
    name: entity.components.Common.name,
    canTrigger: entity.components.Action.canTrigger || false,
    minInputCount: entity.components.Action.minInputCount || 0,
    maxInputCount: entity.components.Action.maxInputCount || 0,
    allowedTargets: entity.components.Action.allowedTargets || [],
  };
}
