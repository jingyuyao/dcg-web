import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { CardViewUI } from '../game/game.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() card: CardViewUI;
  @Input() canAct: boolean;
  @HostBinding('class.fade-in') get fadeIn() {
    return this.card.fadeIn;
  }
  get showPrepurchase() {
    return this.card.ownerEntity === -1;
  }

  @HostListener('click') onClick() {
    console.dir(this.card);
  }
}
