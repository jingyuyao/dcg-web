import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardView } from '../api/card-view';
import { PlayerView } from '../api/player-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideIn, slideOut } from '../animations';
import { UnitView } from '../api/unit-view';

export interface State {
  entity: CardView | UnitView;
  card?: CardView;
  unit?: UnitView;
  count: number;
}

/** Display a merged collection of cards and units. */
@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.sass'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [useAnimation(slideIn)]),
      transition(':leave', [useAnimation(slideOut)]),
    ]),
  ],
})
export class CardContainerComponent implements OnChanges {
  @Input() players: PlayerView[];
  @Input() cards?: CardView[];
  @Input() units?: UnitView[];
  @Input() canAct: boolean;
  @Input() dedupe?: boolean;
  /**
   * Uses a wrapper so enter/leave animations are tied to the wrapper instance
   * rather than the underlying card and unit instances.
   */
  cardStates: State[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentCards: CardView[] = changes.cards?.currentValue || [];
    const currentUnits: UnitView[] = changes.units?.currentValue || [];

    const hasCard = (c?: CardView) =>
      c && currentCards.some((card) => this.isCardEqual(c, card));
    const hasUnit = (u?: UnitView) =>
      u && currentUnits.some((unit) => u.id === unit.id);

    // Filter out states that have no valid card or unit.
    this.cardStates = this.cardStates.filter(
      (state) => hasCard(state.card) || hasUnit(state.unit)
    );

    // Reset missing partial states and counters.
    for (const state of this.cardStates) {
      if (!hasCard(state.card)) {
        state.card = undefined;
      }

      if (!hasUnit(state.unit)) {
        state.unit = undefined;
      }

      state.count = 0;
    }

    // Add or update units.
    for (const unit of currentUnits) {
      // Finds the state for this unit if possible.
      const currentState = this.cardStates.find(
        (state) => unit.id === state.unit?.id
      );

      // Update the unit associated with this state or create a new state.
      if (currentState) {
        currentState.unit = unit;
        currentState.count++;
      } else {
        this.cardStates.push({
          entity: unit,
          unit,
          count: 1,
        });
      }
    }

    // Add or update cards.
    for (const card of currentCards) {
      // Finds the state where the cards are equal (following dedupe rules) or
      // the primary unit for the card.
      const currentState = this.cardStates.find(
        (state) =>
          (state.card && this.isCardEqual(state.card, card)) ||
          (state.unit &&
            !state.unit.isToken &&
            card.id === state.unit.cardEntity)
      );

      // Update the card associated with this state or create a new state.
      if (currentState) {
        currentState.card = card;
        currentState.count++;
      } else {
        this.cardStates.push({
          entity: card,
          card,
          count: 1,
        });
      }
    }

    // Update the primary entity.
    for (const state of this.cardStates) {
      state.entity = state.unit || state.card;
    }
  }

  /** Compare cards by name if we are deduping else compare by id. */
  private isCardEqual(c1: CardView, c2: CardView): boolean {
    return this.dedupe ? c1.name === c2.name : c1.id === c2.id;
  }
}
