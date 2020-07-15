import {
  Component,
  Input,
  HostListener,
  HostBinding,
} from '@angular/core';
import { PlayerView } from '../api/player-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  positiveHighlight,
  negativeHighlight,
} from '../animations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
  animations: [
    trigger('highlight', [
      transition(':increment', [useAnimation(positiveHighlight)]),
      transition(':decrement', [useAnimation(negativeHighlight)]),
    ]),
  ],
})
export class PlayerComponent {
  @Input() player: PlayerView;
  @Input() canAct: boolean;
  @HostBinding('class.isCurrent') get isCurrent() {
    return this.player.isCurrent;
  }

  @HostListener('click') onClick() {
    console.dir(this.player);
  }
}
