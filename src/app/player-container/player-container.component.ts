import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlayerView } from '../api/player-view';

interface State {
  player: PlayerView;
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
    const currentPlayers: PlayerView[] = changes.players.currentValue;
    for (const player of currentPlayers) {
      const state = this.playerStates.find((s) => s.player.id === player.id);
      if (state) {
        state.player = player;
      } else {
        this.playerStates.push({
          player,
        });
      }
    }
  }
}
