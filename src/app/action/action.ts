export interface Action {
  id: number;
  name: string;
  minTargetCount: number;
  maxTargetCount: number;
  allowedTargets: number[];
}

export function fromActionEntity(id: number, entity: any): Action {
  return {
    id,
    name: entity.components.Common.name,
    minTargetCount: entity.components.Action.minTargetCount || 0,
    maxTargetCount: entity.components.Action.maxTargetCount || 0,
    allowedTargets: entity.components.Action.allowedTargets || [],
  };
}
