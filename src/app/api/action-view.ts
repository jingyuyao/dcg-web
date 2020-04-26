import { EntityView } from './entity-view';

export interface ActionView extends EntityView {
  canTrigger: boolean;
  minInputCount: number;
  maxInputCount: number;
  allowedTargets: number[];
}
