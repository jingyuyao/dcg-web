import { Component, OnInit, Input } from '@angular/core';
import { Action } from './action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnInit {
  @Input() action: Action;

  constructor() { }

  ngOnInit(): void {
  }

}
