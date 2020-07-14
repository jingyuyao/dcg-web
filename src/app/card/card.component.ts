import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { CardView } from '../api/card-view';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  animations: [
    trigger('slideIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(75%)',
        })
      ),
      state(
        'true',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      transition('void => true', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class CardComponent {
  @Input() card: CardView;
  @Input() canAct: boolean;
  @Input() @HostBinding('@slideIn') enter: boolean;
  get showPrepurchase() {
    return this.card.ownerEntity === -1;
  }

  @HostListener('click') onClick() {
    console.dir(this.card);
  }
}
