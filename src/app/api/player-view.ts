import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface PlayerView extends EntityView {
  hp: number;
  warpTokens: number;
  isCurrent: boolean;
  powerPool: number;
  totalDeckSize: number;
  currentDeckSize: number;
  actions: ActionView[];
}
