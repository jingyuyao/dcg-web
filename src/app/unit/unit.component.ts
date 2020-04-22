import { Component, Input, HostListener } from '@angular/core';
import { Unit } from './unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent {
  @Input() unit: Unit;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }
}
