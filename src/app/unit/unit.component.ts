import { Component, Input, HostListener, HostBinding } from '@angular/core';
import { UnitViewUI } from '../game/game.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent {
  @Input() unit: UnitViewUI;
  @Input() canAct: boolean;
  @HostBinding('class.fade-in') get fadeIn() {
    return this.unit.fadeIn;
  }

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }
}
