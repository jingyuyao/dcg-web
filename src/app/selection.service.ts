import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from './action/action';
import { Card } from './card/card';
import { Unit } from './unit/unit';
import { Player } from './player/player';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private actionSource = new Subject<Action>();
  action$ = this.actionSource.asObservable();
  private targetSource = new Subject<Player|Unit|Card>();
  target$ = this.targetSource.asObservable();

  constructor() { }

  selectAction(action: Action) {
    this.actionSource.next(action);
    console.dir(JSON.stringify(action, null, 2));
  }

  clearAction() {
    this.actionSource.next();
  }

  selectTarget(target: Player|Unit|Card) {
    this.targetSource.next(target);
    console.dir(JSON.stringify(target, null, 2));
  }
}
