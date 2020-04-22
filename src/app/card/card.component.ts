import { Component, Input, HostListener } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() card: Card;

  @HostListener('click') onClick() {
    console.dir(this.card);
  }
}
