import { Component, Input } from '@angular/core';
import { ActionView } from '../api/action-view';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass'],
})
export class ActionsComponent {
  @Input() actions: ActionView[];
  @Input() canAct: boolean;
  get sortedTriggerableActions(): ActionView[] {
    return this.actions
      .filter((a) => a.canTrigger)
      .sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
  }

  constructor() {}
}
