import {
  Component,
  Input,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';
import {
  positiveHighlight,
  negativeHighlight,
  highlightDiffer,
} from '../animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass'],
  animations: [
    trigger('highlight', [
      transition('* => 1', [useAnimation(positiveHighlight)]),
      transition('* => -1', [useAnimation(negativeHighlight)]),
    ]),
  ],
})
export class UnitComponent implements OnChanges {
  @Input() unit: UnitView;
  @Input() card?: CardView;
  @Input() canAct: boolean;
  strengthChange = 0;
  defenseChange = 0;
  colorChange = 0;
  attributesChange = 0;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousUnit: UnitView | undefined = changes.unit.previousValue;
    const currentUnit: UnitView = changes.unit.currentValue;
    if (!previousUnit) {
      return;
    }

    this.strengthChange = highlightDiffer(
      currentUnit.strength,
      previousUnit.strength
    );
    this.defenseChange = highlightDiffer(
      currentUnit.defense,
      previousUnit.defense
    );
    this.colorChange = highlightDiffer(
      currentUnit.colors.length,
      previousUnit.colors.length
    );
    this.attributesChange = highlightDiffer(
      currentUnit.attributes.length,
      previousUnit.attributes.length
    );
  }
}
