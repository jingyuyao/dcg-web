import { Component, Input, HostListener } from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';
import { positiveHighlight, negativeHighlight } from '../animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass'],
  animations: [
    trigger('highlight', [
      transition(':increment', [useAnimation(positiveHighlight)]),
      transition(':decrement', [useAnimation(negativeHighlight)]),
    ]),
  ],
})
export class UnitComponent {
  @Input() unit: UnitView;
  @Input() card?: CardView;
  @Input() canAct: boolean;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }
}
