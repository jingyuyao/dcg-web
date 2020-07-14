import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { CardView } from '../api/card-view';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() card: CardView;
  @Input() canAct: boolean;
  @Input() @HostBinding('class.fade-in') fadeIn: boolean;
  get showPrepurchase() {
    return this.card.ownerEntity === -1;
  }

  @HostListener('click') onClick() {
    console.dir(this.card);
  }
}
