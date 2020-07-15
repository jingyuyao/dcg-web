import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';
import { PlayerView } from '../api/player-view';

export interface State {
  unit: UnitView;
  card?: CardView;
  enter: boolean;
}

@Component({
  selector: 'app-unit-container',
  templateUrl: './unit-container.component.html',
  styleUrls: ['./unit-container.component.sass'],
})
export class UnitContainerComponent implements OnChanges {
  @Input() players: PlayerView[];
  @Input() units: UnitView[];
  @Input() cards?: CardView[];
  @Input() canAct: boolean;
  unitStates: State[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const currentUnits: UnitView[] = changes.units.currentValue;
    const currentCards: CardView[] | undefined = changes.cards?.currentValue;
    this.unitStates = this.unitStates.filter((s) =>
      currentUnits.some((u) => u.id === s.unit.id)
    );
    for (const unit of currentUnits) {
      const currentState = this.unitStates.find((s) => s.unit.id === unit.id);
      if (currentState) {
        currentState.unit = unit;
        currentState.card = currentCards?.find((c) => c.id === unit.cardEntity);
      } else {
        this.unitStates.push({
          unit,
          card: currentCards?.find((c) => c.id === unit.cardEntity),
          enter: true,
        });
      }
    }
  }
}
