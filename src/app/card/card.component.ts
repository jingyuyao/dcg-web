import { Component, Input, HostListener } from '@angular/core';
import { CardView } from '../api/card-view';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() card: CardView;
  @Input() canAct: boolean;
  @Input() showCost = false;

  @HostListener('click') onClick() {
    console.dir(this.card);
  }
}
