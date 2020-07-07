import { EntityView } from './entity-view';
import { ActionView } from './action-view';

export interface CardView extends EntityView {
  ownerEntity: number;
  cost: number;
  canWrap: boolean;
  kind: CardKind;
  location: CardLocation;
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

export enum CardLocation {
  UNKNOWN = 'UNKNOWN',
  FORGE_DECK = 'FORGE_DECK',
  FORGE_ROW = 'FORGE_ROW',
  THRONE_DECK = 'THRONE_DECK',
  MERCENARY_DECK = 'MERCENARY_DECK',
  PLAYER_DECK = 'PLAYER_DECK',
  DISCARD_PILE = 'DISCARD_PILE',
  HAND = 'HAND',
  PLAY_AREA = 'PLAY_AREA',
}
