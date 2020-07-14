import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { UnitView } from '../api/unit-view';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent {
  @Input() unit: UnitView;
  @Input() canAct: boolean;
  @Input() @HostBinding('class.fade-in') fadeIn: boolean;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }
}
