import { PlayerView } from './player-view';
import { CardView } from './card-view';
import { UnitView } from './unit-view';

export interface WorldView {
  players: PlayerView[];
  forgeRow: CardView[];
  throneDeck: CardView[];
  mercenaryDeck: CardView[];
  playArea: CardView[];
  attackingUnits: UnitView[];
  defendingUnits: UnitView[];
}
