import { Component, Input, OnInit } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';
import { CardView, CardLocation, CardKind } from '../api/card-view';
import { UnitView, UnitState } from '../api/unit-view';
import { PlayerView } from '../api/player-view';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() gameview$: Observable<GameView>;
  discardPileOpen = false;
  canAct = false;
  previousPlayerName = '';
  currentPlayerName = '';
  deckSize = 0;
  throneActive = false;
  players: PlayerView[] = [];
  forgeDedupe: CardView[] = [];
  forge: CardView[] = [];
  playArea: CardView[] = [];
  hand: CardView[] = [];
  discardPile: CardView[] = [];
  attackingUnits: UnitView[] = [];
  defendingUnits: UnitView[] = [];

  ngOnInit(): void {
    this.gameview$.subscribe((game) => {
      this.updateMetadata(game);
      this.updatePlayers(game);
      this.updateForge(game);
      this.updateCards(game);
      this.updateUnits(game);
    });
  }

  private updateMetadata(game: GameView) {
    this.canAct = game.playerId === game.currentPlayerId;
    this.previousPlayerName = game.players.find(
      (p) => p.id === game.previousPlayerId
    )?.name;
    this.currentPlayerName = game.players.find(
      (p) => p.id === game.currentPlayerId
    )?.name;
    const player = game.players.find((p) => p.id === game.playerId);
    this.deckSize = player.currentDeckSize;
  }

  private updatePlayers(game: GameView) {
    this.players = game.players;
  }

  private updateForge(game: GameView) {
    this.forgeDedupe = [];
    this.forge = [];
    for (const card of game.cards) {
      switch (card.location) {
        case CardLocation.FORGE_ROW:
          this.forge.push(card);
          break;
        case CardLocation.THRONE_DECK:
        case CardLocation.MERCENARY_DECK:
          this.forgeDedupe.push(card);
          break;
      }
    }
    this.throneActive = !this.forgeDedupe.find(
      (c) => c.location === CardLocation.THRONE_DECK
    );
  }

  private updateCards(game: GameView) {
    this.playArea = [];
    this.hand = [];
    this.discardPile = [];
    for (const card of game.cards) {
      switch (card.location) {
        case CardLocation.HAND:
          this.hand.push(card);
          break;
        case CardLocation.DISCARD_PILE:
          this.discardPile.push(card);
          break;
        case CardLocation.PLAY_AREA:
          this.playArea.push(card);
          break;
      }
    }
  }

  private updateUnits(game: GameView) {
    this.attackingUnits = [];
    this.defendingUnits = [];
    for (const unit of game.units) {
      switch (unit.state) {
        case UnitState.ATTACKING:
          this.attackingUnits.push(unit);
          break;
        case UnitState.DEFENDING:
          this.defendingUnits.push(unit);
          break;
      }
    }
  }
}
