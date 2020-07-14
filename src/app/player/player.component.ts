import {
  Component,
  Input,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';
import { PlayerView } from '../api/player-view';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit {
  @Input() player: PlayerView;
  @Input() previousPlayer?: PlayerView;
  @Input() canAct: boolean;
  @HostBinding('class.isCurrent') get isCurrent() {
    return this.player.isCurrent;
  }
  hpChanged = false;
  powerChanged = false;
  warpChanged = false;

  @HostListener('click') onClick() {
    console.dir(this.player);
  }

  ngOnInit(): void {
    if (!this.previousPlayer) {
      return;
    }

    this.hpChanged = this.previousPlayer.hp !== this.player.hp;
    this.powerChanged = this.previousPlayer.powerPool !== this.player.powerPool;
    this.warpChanged =
      this.previousPlayer.warpTokens !== this.player.warpTokens;
  }
}
