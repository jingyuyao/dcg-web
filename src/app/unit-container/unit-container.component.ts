import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { UnitView } from '../api/unit-view';

export interface State {
  unit: UnitView;
  previousUnit?: UnitView;
  fadeIn: boolean;
}

@Component({
  selector: 'app-unit-container',
  templateUrl: './unit-container.component.html',
  styleUrls: ['./unit-container.component.sass'],
})
export class UnitContainerComponent implements OnInit, OnChanges {
  @Input() units: UnitView[];
  @Input() canAct: boolean;
  unitStates: State[];

  constructor() {}

  ngOnInit(): void {
    this.unitStates = this.units.map((unit) => ({
      unit,
      fadeIn: true,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousUnits: UnitView[] = changes.units.previousValue || [];
    const currentUnits: UnitView[] = changes.units.currentValue;
    this.unitStates = currentUnits.map((unit) => {
      const previousUnit = previousUnits.find((u) => u.id === unit.id);
      return {
        unit,
        previousUnit,
        fadeIn: !previousUnit,
      };
    });
  }
}
