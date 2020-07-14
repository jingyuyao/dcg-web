import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardView } from '../api/card-view';

export interface State {
  card: CardView;
  fadeIn: boolean;
}

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.sass']
})
export class CardContainerComponent implements OnInit, OnChanges {
  @Input() cards: CardView[];
  @Input() canAct: boolean;
  cardStates: State[];

  constructor() { }

  ngOnInit(): void {
    this.cardStates = this.cards.map((card) => ({
      card,
      fadeIn: true,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousCards: CardView[] = changes.cards.previousValue;
    const currentCards: CardView[] = changes.cards.currentValue;
    this.cardStates = currentCards.map((card) => ({
      card,
      fadeIn: !previousCards.find((c) => c.id === card.id),
    }));
  }
}
