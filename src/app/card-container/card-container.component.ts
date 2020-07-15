import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardView, CardKind } from '../api/card-view';
import { PlayerView } from '../api/player-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideIn } from '../animations';

export interface State {
  card: CardView;
  count: number;
}

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.sass'],
  animations: [
    trigger('slideIn', [transition(':enter', [useAnimation(slideIn)])]),
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
    this.cardStates = this.cardStates.filter((s) =>
      currentCards.some((c) => c.id === s.card.id)
    );
    for (const state of this.cardStates) {
      state.count = 0;
    }
    for (const card of currentCards) {
      if (this.hideUnits && card.kind === CardKind.UNIT) {
        continue;
      }

      const currentState = this.cardStates.find((s) =>
        this.dedupe ? s.card.name === card.name : s.card.id === card.id
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
}
