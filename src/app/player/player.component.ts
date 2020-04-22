import { Component, Input, HostListener } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  @Input() player: Player;

  @HostListener('click') onClick() {
    console.dir(this.player);
  }
}
