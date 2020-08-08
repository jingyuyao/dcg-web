import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardView, CardKind } from '../api/card-view';
import { PlayerView } from '../api/player-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideIn, slideOut } from '../animations';

export interface State {
  card: CardView;
  count: number;
}

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.sass'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [useAnimation(slideIn)]),
      transition(':leave', [useAnimation(slideOut)])
    ]),
  ],
})
export class CardContainerComponent implements OnChanges {
  @Input() players: PlayerView[];
  @Input() cards: CardView[];
  @Input() canAct: boolean;
  @Input() dedupe?: boolean;
  @Input() hideUnits?: boolean;
  cardStates: State[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentCards: CardView[] = changes.cards.currentValue;
    this.cardStates = this.cardStates.filter((state) =>
      currentCards.some((card) => this.isCardEqual(card, state.card))
    );
    for (const state of this.cardStates) {
      state.count = 0;
    }
    for (const card of currentCards) {
      if (this.hideUnits && card.kind === CardKind.UNIT) {
        continue;
      }

      const currentState = this.cardStates.find((state) =>
        this.isCardEqual(state.card, card)
      );

      if (currentState) {
        currentState.card = card;
        currentState.count++;
      } else {
        this.cardStates.push({
          card,
          count: 1,
        });
      }
    }
  }

  /** Compare cards by name if we are deduping else compare by id. */
  private isCardEqual(c1: CardView, c2: CardView): boolean {
    return this.dedupe ? c1.name === c2.name : c1.id === c2.id;
  }
}
