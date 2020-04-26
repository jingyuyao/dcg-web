import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface CardView extends EntityView {
  cost: number;
  canWrap: boolean;
  kind: string;
  colors: string[];
  strength: number;
  actions: ActionView[];
}
