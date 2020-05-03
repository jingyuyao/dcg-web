import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable, combineLatest } from 'rxjs';
import { AttachmentView } from '../api/attachment-view';
import { ExecutionView } from '../api/execution-view';

interface ExecutionSection {
  playerName: string;
  history: ExecutionView[];
}

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
  executionSections: ExecutionSection[] = [];

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
    this.gameview$.subscribe((gameView) => {
      let lastSection: ExecutionSection | undefined = this.executionSections[0];
      for (const execution of gameView.recentExecutions) {
        if (execution.executorName === lastSection?.playerName) {
          lastSection.history.unshift(execution);
        } else {
          lastSection = {
            playerName: execution.executorName,
            history: [execution],
          };
          this.executionSections.unshift(lastSection);
        }
      }
    });
  }
}
