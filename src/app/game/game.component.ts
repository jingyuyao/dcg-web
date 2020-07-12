import { Component, Input, OnInit } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';
import { CardView, CardLocation, CardKind } from '../api/card-view';
import { UnitView, UnitState } from '../api/unit-view';
import { PlayerView } from '../api/player-view';

// NOTE: somehow angular doesn't update when we change individual references to
// a property.
interface ForgeGroup {
  card: CardView;
  count: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() gameview$: Observable<GameView>;
  canAct: boolean;
  previousPlayerName: string;
  currentPlayerName: string;
  deckSize: number;
  players: PlayerView[];
  forge: CardView[];
  forgeGroups: ForgeGroup[];
  throneActive: boolean;
  playArea: CardView[];
  hand: CardView[];
  discardPile: CardView[];
  attackingUnits: UnitView[];
  defendingUnits: UnitView[];

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
    this.forge = [];
    this.forgeGroups = [];
    let throne = null;
    let numThrone = 0;
    let mercenary = null;
    let numMercenary = 0;
    for (const card of game.cards) {
      switch (card.location) {
        case CardLocation.FORGE_ROW:
          this.forge.push(card);
          break;
        case CardLocation.THRONE_DECK:
          if (throne == null) {
            throne = card;
          }
          numThrone++;
          break;
        case CardLocation.MERCENARY_DECK:
          if (mercenary == null) {
            mercenary = card;
          }
          numMercenary++;
          break;
      }
    }
    if (throne) {
      this.forgeGroups.push({card: throne, count: numThrone});
      this.throneActive = false;
    } else {
      this.throneActive = true;
    }
    if (mercenary) {
      this.forgeGroups.push({card: mercenary, count: numMercenary});
    }
    this.forge.sort(
      (c1, c2) =>
        FORGE_ORDER.indexOf(c1.location) - FORGE_ORDER.indexOf(c2.location)
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
          if (card.kind !== CardKind.UNIT) {
            this.playArea.push(card);
          }
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

const FORGE_ORDER = [
  CardLocation.THRONE_DECK,
  CardLocation.MERCENARY_DECK,
  CardLocation.FORGE_ROW,
];
