import {
  Component,
  Input,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';
import { PlayerView } from '../api/player-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  highlightDiffer,
  positiveHighlight,
  negativeHighlight,
} from '../animations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
  animations: [
    trigger('highlight', [
      transition('* => 1', [useAnimation(positiveHighlight)]),
      transition('* => -1', [useAnimation(negativeHighlight)]),
    ]),
  ],
})
export class PlayerComponent implements OnInit {
  @Input() player: PlayerView;
  @Input() previousPlayer?: PlayerView;
  @Input() canAct: boolean;
  @HostBinding('class.isCurrent') get isCurrent() {
    return this.player.isCurrent;
  }
  hpChange = 0;
  powerChange = 0;
  warpChange = 0;

  @HostListener('click') onClick() {
    console.dir(this.player);
  }

  ngOnInit(): void {
    if (!this.previousPlayer) {
      return;
    }

    this.hpChange = highlightDiffer(this.player.hp, this.previousPlayer.hp);
    this.powerChange = highlightDiffer(
      this.player.powerPool,
      this.previousPlayer.powerPool
    );
    this.warpChange = highlightDiffer(
      this.player.warpTokens,
      this.previousPlayer.warpTokens
    );
  }
}
