import { PlayerView } from './player-view';
import { CardView } from './card-view';

export interface WorldView {
  players: PlayerView[];
  forgeRow: CardView[];
  throneDeck: CardView[];
  mercenaryDeck: CardView[];
  playArea: CardView[];
}
