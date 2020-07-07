import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface CardView extends EntityView {
  cost: number;
  canWrap: boolean;
  kind: CardKind;
  colors: string[];
  strength: number;
  actions: ActionView[];
}

export enum CardKind {
  UNKNOWN = 'UNKNOWN',
  BASIC = 'BASIC',
  SPELL = 'SPELL',
  UNIT = 'UNIT',
}
