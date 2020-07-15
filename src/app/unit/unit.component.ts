import {
  Component,
  Input,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass'],
})
export class UnitComponent implements OnChanges {
  @Input() unit: UnitView;
  @Input() card?: CardView;
  @Input() canAct: boolean;
  strengthChanged = false;
  defenseChanged = false;
  colorChanged = false;
  attributesChanged = false;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousUnit: UnitView | undefined = changes.unit.previousValue;
    const currentUnit: UnitView = changes.unit.currentValue;
    if (!previousUnit) {
      return;
    }

    this.strengthChanged = previousUnit.strength !== currentUnit.strength;
    this.defenseChanged = previousUnit.defense !== currentUnit.defense;
    this.colorChanged =
      previousUnit.colors.length !== currentUnit.colors.length ||
      previousUnit.colors.some((c) => !currentUnit.colors.includes(c));
    this.attributesChanged =
      previousUnit.attributes.length !== currentUnit.attributes.length ||
      previousUnit.attributes.some((a) => !currentUnit.attributes.includes(a));
  }
}
