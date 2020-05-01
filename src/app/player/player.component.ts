import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { PlayerView } from '../api/player-view';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  @Input() player: PlayerView;
  @HostBinding('class.isCurrent') get isCurrent() {
    return this.player.isCurrent;
  }

  @HostListener('click') onClick() {
    console.dir(this.player);
  }
}
