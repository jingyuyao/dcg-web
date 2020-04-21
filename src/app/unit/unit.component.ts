import { Component, OnInit, Input } from '@angular/core';
import { Unit } from './unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.sass']
})
export class UnitComponent implements OnInit {
  @Input() unit: Unit;

  constructor() { }

  ngOnInit(): void {
  }

}
