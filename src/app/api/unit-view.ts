import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface UnitView extends EntityView {
  strength: number;
  defense: number;
  attributes: string[];
  actions: ActionView[];
}
