import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface UnitView extends EntityView {
  ownerEntity: number;
  cardEntity: number;
  state: UnitState;
  strength: number;
  defense: number;
  attributes: UnitAttribute[];
  actions: ActionView[];
}

export enum UnitState {
  UNKNOWN = 'UNKNOWN',
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
