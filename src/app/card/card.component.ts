import { Component, Input, HostListener } from '@angular/core';
import { CardView } from '../api/card-view';
import { UnitView } from '../api/unit-view';
import { trigger, transition, useAnimation } from '@angular/animations';
import { positiveHighlight, negativeHighlight } from '../animations';

/** Represents a merged card + unit the player can interact with. */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  animations: [
    trigger('highlight', [
      transition(':increment', [useAnimation(positiveHighlight)]),
      transition(':decrement', [useAnimation(negativeHighlight)]),
    ]),
  ],
})
export class CardComponent {
  /**
   * The primary entity for the component. It is the unit instance if exists,
   * else it is the card instance.
   */
  @Input() entity: CardView|UnitView;
  /**
   * There's three possible combinations:
   * - card only: its just a card
   * - card and unit: its the primary unit of the card
   * - unit only: its an unit token
   *
   * Note that the primary unit can become a "card" or "token" if its associated
   * card or unit is destroyed.
   */
  @Input() card?: CardView;
  @Input() unit?: UnitView;
  @Input() canAct: boolean;

  get isOwned() {
    return this.entity.ownerEntity !== -1;
  }

  get defense() {
    return this.unit?.defense || 0;
  }

  get isCardOnly() {
    return this.card && !this.unit;
  }

  get isPrimaryUnit() {
    return this.card && this.unit;
  }

  get isUnitToken() {
    return !this.card && this.unit;
  }

  @HostListener('click') onClick() {
    console.dir(this.entity);
  }
}
