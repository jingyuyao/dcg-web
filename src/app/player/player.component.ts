import { Component, Input } from '@angular/core';
import { Player } from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent {
  @Input() player: Player;
}
