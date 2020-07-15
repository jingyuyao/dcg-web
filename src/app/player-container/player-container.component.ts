import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class PlayerContainerComponent implements OnInit, OnChanges {
  @Input() players: PlayerView[];
  @Input() canAct: boolean;
  playerStates: State[];

  constructor() {}

  ngOnInit(): void {
    this.playerStates = this.players.map((player) => ({
      player,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousPlayers: PlayerView[] = changes.players.previousValue || [];
    const currentPlayers: PlayerView[] = changes.players.currentValue;
    // Don't expect the players to change after starting a game.
    for (const state of this.playerStates) {
      state.player = currentPlayers.find((p) => p.id === state.player.id);
      state.previousPlayer = previousPlayers.find(
        (p) => p.id === state.player.id
      );
    }
  }
}
