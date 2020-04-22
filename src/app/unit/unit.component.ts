import { Component, Input, OnDestroy, HostBinding } from '@angular/core';
import { Unit } from './unit';
import { SelectionService } from '../selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent implements OnDestroy {
  private actionSubsciption: Subscription;
  private targetSubscription: Subscription;
  @Input() unit: Unit;
  @HostBinding('class.targetable') targetable = false;
  @HostBinding('class.targetted') targetted = false;

  constructor(private selection: SelectionService) {
    this.actionSubsciption = selection.action$.subscribe((action) => {
      this.targetted = false;
      this.targetable = action && action.allowedInputs.includes(this.unit.id);
    });
    this.targetSubscription = selection.target$.subscribe((target) => {
      if (this.unit === target) {
        this.targetable = false;
        this.targetted = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.actionSubsciption.unsubscribe();
    this.targetSubscription.unsubscribe();
  }
}
