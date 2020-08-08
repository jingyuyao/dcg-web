import { Component, Input, OnInit } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';
import { CardView, CardLocation } from '../api/card-view';
import { UnitView, UnitState } from '../api/unit-view';
import { PlayerView } from '../api/player-view';
import { GameClientService } from '../game-client.service';
import { FormControl } from '@angular/forms';

const AUTO_PLAY_DELAY = 1000; // ms

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() gameview$: Observable<GameView>;
  autoPlay = new FormControl(false);
  autoPlayPromise = Promise.resolve();
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

  constructor(private gameClient: GameClientService) {}

  ngOnInit(): void {
    this.autoPlay.valueChanges.subscribe(() => this.maybeAutoPlay());
    this.gameview$.subscribe((game) => {
      this.updateMetadata(game);
      this.updatePlayers(game);
      this.updateForge(game);
      this.updateCards(game);
      this.updateUnits(game);
      this.maybeAutoPlay();
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

  /**
   * Play the first card in hand if possible. This should be called after an
   * world update.
   */
  private maybeAutoPlay() {
    if (!this.autoPlay.value || !this.canAct || this.hand.length === 0) {
      return;
    }

    // Schedules a play after the previous delay ends.
    this.autoPlayPromise = this.autoPlayPromise.then(
      () =>
        new Promise((resolve) => {
          this.maybePlayFirstCardInHand();
          setTimeout(resolve, AUTO_PLAY_DELAY);
        })
    );
  }

  private maybePlayFirstCardInHand() {
    // Assumes the only action a card in hand has is play.
    const playAction = this.hand[0]?.actions[0];
    if (this.autoPlay.value && this.canAct && playAction) {
      this.gameClient.execute(playAction.id);
    }
  }
}
