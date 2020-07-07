import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface UnitView extends EntityView {
  ownerEntity: number;
  cardEntity: number;
  strength: number;
  defense: number;
  attributes: UnitAttribute[];
  actions: ActionView[];
}

export enum UnitAttribute {
  FLYING = 'FLYING',
  LIFESTEAL = 'LIFESTEAL',
  BERSERK = 'BERSERK',
  ENDURANCE = 'ENDURANCE',
  UNBLOCKABLE = 'UNBLOCKABLE',
}
