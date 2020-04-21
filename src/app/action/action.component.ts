import { Component, OnInit, Input } from '@angular/core';
import { Action } from './action';
import { ExecutorService } from '../executor.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnInit {
  @Input() action: Action;

  constructor(private executor: ExecutorService) { }

  ngOnInit(): void {
  }

  beginAction() {
    this.executor.beginAction(this.action.id);
  }
}
