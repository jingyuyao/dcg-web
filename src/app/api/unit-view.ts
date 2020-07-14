import { EntityView } from './entity-view';
import { ActionView } from './action-view';
import { CardColor } from './card-view';

export interface UnitView extends EntityView {
  ownerEntity: number;
  cardEntity: number;
  state: UnitState;
  isToken: boolean;
  strength: number;
  defense: number;
  colors: CardColor[];
  attributes: UnitAttribute[];
  actions: ActionView[];
}

export enum UnitState {
  ATTACKING = 'ATTACKING',
  DEFENDING = 'DEFENDING',
}

export enum UnitAttribute {
  FLYING = 'FLYING',
  LIFESTEAL = 'LIFESTEAL',
  BERSERK = 'BERSERK',
  ENDURANCE = 'ENDURANCE',
  UNBLOCKABLE = 'UNBLOCKABLE',
}
