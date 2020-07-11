import { PlayerView } from './player-view';
import { CardView } from './card-view';
import { UnitView } from './unit-view';

export interface GameView {
  currentPlayerName: string;
  previousPlayerName: string;
  players: PlayerView[];
  cards: CardView[];
  units: UnitView[];
}
