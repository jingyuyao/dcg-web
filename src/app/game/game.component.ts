import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttachmentView } from '../api/attachment-view';
import { CommandView } from '../api/command-view';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() attachmentView$: Observable<AttachmentView>;
  // TODO: need to show played units as voidbindable
  @Input() gameview$: Observable<GameView>;
  @HostBinding('class.canAct') canAct: boolean;
  commandHistory: CommandView[] = [];

  ngOnInit(): void {
    combineLatest([this.attachmentView$, this.gameview$])
      .pipe(
        map(([attachment, game]) => {
          const currentPlayer = game.players.find((player) => player.isCurrent);
          return attachment.playerName === currentPlayer?.name;
        })
      )
      .subscribe((canAct) => (this.canAct = canAct));
    this.gameview$.subscribe((gameView) => {
      this.commandHistory.push(...gameView.recentCommandHistory);
    });
  }
}
