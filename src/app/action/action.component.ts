import { Component, OnDestroy, Input } from '@angular/core';
import { Action } from './action';
import { SelectionService } from '../selection.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameClientService } from '../game-client.service';
import { ActionView } from '../api/action-view';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnDestroy {
  private clearTargetsSource = new Subject<void>();
  private selectionSubscription: Subscription;
  @Input() action: Action|ActionView;
  targets: number[] = [];
  targeting = false;
  get canExecute() {
    return this.targets.length >= this.action.minInputCount;
  }

  constructor(private selection: SelectionService, private gameClient: GameClientService) {
    this.selectionSubscription = this.selection.action$.subscribe((action) => {
      this.targets = [];
      if (action === this.action) {
        this.targeting = true;
      } else {
        this.targeting = false;
        this.clearTargetsSource.next();
      }
    });
  }

  beginAction(event: Event) {
    event.stopPropagation();
    if (this.action.minInputCount === 0) {
      this.gameClient.execute(this.action.id);
    } else {
      this.selection.selectAction(this.action);
      this.selection.target$.pipe(takeUntil(this.clearTargetsSource)).subscribe((entityId) => {
        if (this.action.allowedTargets.includes(entityId)) {
          console.log(`adding ${entityId} for ${this.action.name}`);
          this.targets.push(entityId);
          if (this.targets.length === this.action.maxInputCount) {
            this.gameClient.execute(this.action.id, this.targets);
            this.selection.clearAction();
          }
        } else {
          console.log(`${entityId} is not a valid input for ${this.action.name}`);
        }
      });
    }
  }

  executeAction(event: Event) {
    event.stopPropagation();
    this.gameClient.execute(this.action.id, this.targets);
    this.selection.clearAction();
  }

  cancelAction(event: Event) {
    event.stopPropagation();
    this.selection.clearAction();
  }

  ngOnDestroy(): void {
    this.clearTargetsSource.complete();
    this.selectionSubscription.unsubscribe();
  }
}
