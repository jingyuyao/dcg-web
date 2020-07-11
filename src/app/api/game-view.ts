import { PlayerView } from './player-view';
import { CardView } from './card-view';
import { UnitView } from './unit-view';

export interface GameView {
  playerId: number;
  currentPlayerId: number;
  previousPlayerId: number;
  players: PlayerView[];
  cards: CardView[];
  units: UnitView[];
}
