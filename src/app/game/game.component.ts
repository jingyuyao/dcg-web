import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable, combineLatest } from 'rxjs';
import { AttachmentView } from '../api/attachment-view';

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
  previousPlayerName: string;
  currentPlayerName: string;

  ngOnInit(): void {
    combineLatest([this.attachmentView$, this.gameview$]).subscribe(
      ([attachment, game]) => {
        this.canAct = attachment.playerName === game.currentPlayerName;
        this.previousPlayerName =
          game.previousPlayerName === attachment.playerName
            ? 'Your'
            : game.previousPlayerName + `'s`;
        this.currentPlayerName =
          game.currentPlayerName === attachment.playerName
            ? 'Your'
            : game.currentPlayerName + `'s`;
      }
    );
  }
}
