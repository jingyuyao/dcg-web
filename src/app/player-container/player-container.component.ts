import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerView } from '../api/player-view';

interface State {
  player: PlayerView;
  previousPlayer?: PlayerView;
}

@Component({
  selector: 'app-player-container',
  templateUrl: './player-container.component.html',
  styleUrls: ['./player-container.component.sass'],
})
export class PlayerContainerComponent implements OnChanges {
  @Input() players: PlayerView[];
  @Input() canAct: boolean;
  playerStates: State[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const previousPlayers: PlayerView[] = changes.players.previousValue || [];
    const currentPlayers: PlayerView[] = changes.players.currentValue;
    this.playerStates = currentPlayers.map((player) => {
      const previousPlayer = previousPlayers.find((p) => p.id === player.id);
      return {
        player,
        previousPlayer,
      };
    });
  }
}
