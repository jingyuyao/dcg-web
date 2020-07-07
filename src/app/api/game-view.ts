import { PlayerView } from './player-view';
import { CardView } from './card-view';
import { UnitView } from './unit-view';
import { ExecutionView } from './execution-view';

export interface GameView {
  currentPlayerName: string;
  previousPlayerName: string;
  players: PlayerView[];
  cards: CardView[];
  units: UnitView[];
  forgeRow: CardView[];
  throneDeck: CardView[];
  mercenaryDeck: CardView[];
  playArea: CardView[];
  hand: CardView[];
  discardPile: CardView[];
  attackingUnits: UnitView[];
  defendingUnits: UnitView[];
  recentExecutions: ExecutionView[];
}
