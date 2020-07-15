import { Component, OnInit, Input } from '@angular/core';
import { ActionView } from '../api/action-view';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass'],
})
export class ActionsComponent implements OnInit {
  @Input() actions: ActionView[];
  @Input() canAct: boolean;
  sortedTriggerableActions: ActionView[];

  constructor() {}

  ngOnInit(): void {
    this.sortedTriggerableActions = this.actions
      .filter((a) => a.canTrigger)
      .sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
  }
}
