import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionView } from './api/action-view';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private actionSource = new Subject<ActionView|undefined>();
  private targetSource = new Subject<number>();
  action$ = this.actionSource.asObservable();
  target$ = this.targetSource.asObservable();

  constructor() { }

  selectAction(action: ActionView) {
    this.actionSource.next(action);
  }

  clearAction() {
    this.actionSource.next();
  }

  selectTarget(entityId: number) {
    this.targetSource.next(entityId);
  }
}
