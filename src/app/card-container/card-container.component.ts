import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CardView } from '../api/card-view';

export interface State {
  card: CardView;
  fadeIn: boolean;
  count?: number;
}

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.sass'],
})
export class CardContainerComponent implements OnInit, OnChanges {
  @Input() cards: CardView[];
  @Input() canAct: boolean;
  @Input() dedupe = false;
  cardStates: State[] = [];

  constructor() {}

  ngOnInit(): void {
    this.cardStates = this.computeStates(this.cards, this.cardStates);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentCards: CardView[] = changes.cards.currentValue;
    this.cardStates = this.computeStates(currentCards, this.cardStates);
  }

  private computeStates(cards: CardView[], currentStates: State[]): State[] {
    const states: State[] = [];
    for (const card of cards) {
      const fadeIn = !currentStates.find((s) => s.card.id === card.id);
      if (this.dedupe) {
        const existingState = states.find((s) => s.card.name === card.name);
        if (existingState) {
          existingState.count++;
        } else {
          states.push({
            card,
            fadeIn,
            count: 1,
          });
        }
      } else {
        states.push({
          card,
          fadeIn,
        });
      }
    }
    return states;
  }
}
