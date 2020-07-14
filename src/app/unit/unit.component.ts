import {
  Component,
  Input,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';
import { UnitView } from '../api/unit-view';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass'],
})
export class UnitComponent implements OnInit {
  @Input() unit: UnitView;
  @Input() previousUnit?: UnitView;
  @Input() canAct: boolean;
  @Input() @HostBinding('class.fade-in') fadeIn: boolean;
  strengthChanged: boolean;
  defenseChanged: boolean;
  colorChanged: boolean;
  attributesChanged: boolean;

  @HostListener('click') onClick() {
    console.dir(this.unit);
  }

  ngOnInit(): void {
    if (!this.previousUnit) {
      return;
    }

    this.strengthChanged = this.previousUnit.strength !== this.unit.strength;
    this.defenseChanged = this.previousUnit.defense !== this.unit.defense;
    this.colorChanged =
      this.previousUnit.colors.length !== this.unit.colors.length ||
      this.previousUnit.colors.some((c) => !this.unit.colors.includes(c));
    this.attributesChanged =
      this.previousUnit.attributes.length !== this.unit.attributes.length ||
      this.previousUnit.attributes.some(
        (a) => !this.unit.attributes.includes(a)
      );
  }
}
