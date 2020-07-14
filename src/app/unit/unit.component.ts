import {
  Component,
  Input,
  HostListener,
  HostBinding,
  OnInit,
} from '@angular/core';
import { UnitView } from '../api/unit-view';
import { CardView } from '../api/card-view';
import {
  state,
  style,
  trigger,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass'],
  animations: [
    trigger('slideIn', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(75%)',
        })
      ),
      state(
        'true',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      transition('void => true', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class UnitComponent implements OnInit {
  @Input() unit: UnitView;
  @Input() card?: CardView;
  @Input() previousUnit?: UnitView;
  @Input() canAct: boolean;
  @Input() @HostBinding('@slideIn') enter: boolean;
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
