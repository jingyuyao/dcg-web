import { Component, Input, HostListener } from '@angular/core';
import { PlayerView } from '../api/player-view';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  @Input() player: PlayerView;

  @HostListener('click') onClick() {
    console.dir(this.player);
  }
}
