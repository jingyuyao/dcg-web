import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable, combineLatest } from 'rxjs';
import { AttachmentView } from '../api/attachment-view';
import { CardView, CardKind, CardLocation } from '../api/card-view';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() attachmentView$: Observable<AttachmentView>;
  @Input() gameview$: Observable<GameView>;
  @HostBinding('class.canAct') canAct: boolean;
  previousPlayerName: string;
  currentPlayerName: string;
  forge: CardView[];
  numThrone: number;
  numMercenary: number;

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
    this.gameview$.subscribe((game) => {
      this.updateForge(game);
    });
  }

  private updateForge(game: GameView) {
    this.forge = [];
    this.numThrone = 0;
    this.numMercenary = 0;
    for (const card of game.cards) {
      if (card.location === CardLocation.FORGE_ROW) {
        this.forge.push(card);
      }
      if (card.location === CardLocation.THRONE_DECK) {
        if (this.numThrone === 0) {
          this.forge.push(card);
        }
        this.numThrone++;
      }
      if (card.location === CardLocation.MERCENARY_DECK) {
        if (this.numMercenary === 0) {
          this.forge.push(card);
        }
        this.numMercenary++;
      }
    }
    this.forge.sort((c1, c2) => (
      FORGE_ORDER.indexOf(c1.location) - FORGE_ORDER.indexOf(c2.location)
    ));
  }
}

const FORGE_ORDER = [
  CardLocation.THRONE_DECK,
  CardLocation.MERCENARY_DECK,
  CardLocation.FORGE_ROW,
];
