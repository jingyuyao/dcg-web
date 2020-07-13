import { Component, Input, OnInit } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';
import { CardView, CardLocation, CardKind } from '../api/card-view';
import { UnitView, UnitState } from '../api/unit-view';
import { PlayerView } from '../api/player-view';

export interface CardViewUI extends CardView {
  fadeIn: boolean;
}

export interface UnitViewUI extends UnitView {
  fadeIn: boolean;
}

// NOTE: somehow angular doesn't update when we change individual references to
// a property.
interface ForgeGroup {
  card: CardViewUI;
  count: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  @Input() gameview$: Observable<GameView>;
  canAct = false;
  previousPlayerName = '';
  currentPlayerName = '';
  deckSize = 0;
  throneActive = false;
  players: PlayerView[] = [];
  forgeGroups: ForgeGroup[] = [];
  previousCards: CardView[] = [];
  forge: CardViewUI[] = [];
  playArea: CardViewUI[] = [];
  hand: CardViewUI[] = [];
  discardPile: CardViewUI[] = [];
  previousUnits: UnitView[] = [];
  attackingUnits: UnitViewUI[] = [];
  defendingUnits: UnitViewUI[] = [];

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
    const previousForgeGroups = this.forgeGroups;
    this.forge = [];
    this.forgeGroups = [];
    let throne = null;
    let numThrone = 0;
    let mercenary = null;
    let numMercenary = 0;
    for (const card of game.cards) {
      switch (card.location) {
        case CardLocation.FORGE_ROW:
          const previousCard = this.previousCards.find((c) => c.id === card.id);
          const locationChanged = previousCard?.location !== card.location;
          this.forge.push({
            ...card,
            fadeIn: locationChanged,
          });
          break;
        case CardLocation.THRONE_DECK:
          const previousThrone = previousForgeGroups.find(
            (g) => g.card.id === card.id
          );
          if (throne == null) {
            throne = {
              ...card,
              fadeIn: !previousThrone,
            };
          }
          numThrone++;
          break;
        case CardLocation.MERCENARY_DECK:
          const previousMercenary = previousForgeGroups.find(
            (g) => g.card.id === card.id
          );
          if (mercenary == null) {
            mercenary = {
              ...card,
              fadeIn: !previousMercenary,
            };
          }
          numMercenary++;
          break;
      }
    }
    if (throne) {
      this.forgeGroups.push({ card: throne, count: numThrone });
      this.throneActive = false;
    } else {
      this.throneActive = true;
    }
    if (mercenary) {
      this.forgeGroups.push({ card: mercenary, count: numMercenary });
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
      const previousCard = this.previousCards.find((c) => c.id === card.id);
      const locationChanged = previousCard?.location !== card.location;
      const cardViewUI = {
        ...card,
        fadeIn: locationChanged,
      };
      switch (card.location) {
        case CardLocation.HAND:
          this.hand.push(cardViewUI);
          break;
        case CardLocation.DISCARD_PILE:
          this.discardPile.push(cardViewUI);
          break;
        case CardLocation.PLAY_AREA:
          if (card.kind !== CardKind.UNIT) {
            this.playArea.push(cardViewUI);
          }
          break;
      }
    }
    this.previousCards = game.cards;
  }

  private updateUnits(game: GameView) {
    this.attackingUnits = [];
    this.defendingUnits = [];
    for (const unit of game.units) {
      const previousUnit = this.previousUnits.find((u) => u.id === unit.id);
      const stateChanged = previousUnit?.state !== unit.state;
      const unitViewUI = {
        ...unit,
        fadeIn: stateChanged,
      };
      switch (unit.state) {
        case UnitState.ATTACKING:
          this.attackingUnits.push(unitViewUI);
          break;
        case UnitState.DEFENDING:
          this.defendingUnits.push(unitViewUI);
          break;
      }
    }
    this.previousUnits = game.units;
  }
}

const FORGE_ORDER = [
  CardLocation.THRONE_DECK,
  CardLocation.MERCENARY_DECK,
  CardLocation.FORGE_ROW,
];
