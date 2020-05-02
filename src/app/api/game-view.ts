import { PlayerView } from './player-view';
import { CardView } from './card-view';
import { UnitView } from './unit-view';
import { CommandView } from './command-view';

export interface GameView {
  players: PlayerView[];
  forgeRow: CardView[];
  throneDeck: CardView[];
  mercenaryDeck: CardView[];
  playArea: CardView[];
  hand: CardView[];
  attackingUnits: UnitView[];
  defendingUnits: UnitView[];
  recentCommandHistory: CommandView[];
}
