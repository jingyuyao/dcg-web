import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';

export interface State {
  unit: UnitView;
  card?: CardView;
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
  @Input() cards?: CardView[];
  @Input() canAct: boolean;
  unitStates: State[];

  constructor() {}

  ngOnInit(): void {
    this.unitStates = this.units.map((unit) => ({
      unit,
      card: this.cards?.find((c) => c.id === unit.cardEntity),
      fadeIn: true,
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousUnits: UnitView[] = changes.units.previousValue || [];
    const currentUnits: UnitView[] = changes.units.currentValue;
    const currentCards: CardView[]|undefined = changes.cards?.currentValue;
    this.unitStates = currentUnits.map((unit) => {
      const previousUnit = previousUnits.find((u) => u.id === unit.id);
      return {
        unit,
        card: currentCards?.find((c) => c.id === unit.cardEntity),
        previousUnit,
        fadeIn: !previousUnit,
      };
    });
  }
}
