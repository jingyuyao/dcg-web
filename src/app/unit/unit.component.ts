import { Component, Input, HostListener } from '@angular/core';
import { UnitView } from '../api/unit-view';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent {
  @Input() unit: UnitView;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }
}
