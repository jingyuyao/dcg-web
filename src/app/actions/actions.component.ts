import { Component, OnInit, Input } from '@angular/core';
import { ActionView } from '../api/action-view';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass']
})
export class ActionsComponent implements OnInit {
  @Input() actions: ActionView[];
  sortedActions: ActionView[];

  constructor() { }

  ngOnInit(): void {
    this.sortedActions = this.actions.sort((a, b) => {
      const aTitle = a.description || a.name;
      const bTitle = b.description || b.name;
      return aTitle < bTitle ? -1 : 1;
    });
  }
}
