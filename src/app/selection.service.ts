import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from './action/action';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private actionSource = new Subject<Action|undefined>();
  private targetSource = new Subject<number>();
  action$ = this.actionSource.asObservable();
  target$ = this.targetSource.asObservable();

  constructor() { }

  selectAction(action: Action) {
    this.actionSource.next(action);
    console.dir(JSON.stringify(action, null, 2));
  }

  clearAction() {
    this.actionSource.next();
  }

  selectTarget(entityId: number) {
    this.targetSource.next(entityId);
  }
}
