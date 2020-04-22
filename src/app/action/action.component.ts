import { Component, OnDestroy, Input } from '@angular/core';
import { Action } from './action';
import { SelectionService } from '../selection.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameClientService } from '../game-client.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnDestroy {
  private clearTargetsSource = new Subject<void>();
  private clearTargetsSubscription: Subscription;
  private selectionSubscription: Subscription;
  @Input() action: Action;
  targets: number[] = [];

  constructor(private selection: SelectionService, private gameClient: GameClientService) {
    this.selectionSubscription = this.selection.action$.subscribe((action) => {
      if (action !== this.action) {
        this.clearTargetsSource.next();
      }
    });
    this.clearTargetsSubscription = this.clearTargetsSource.subscribe(() => {
      this.targets = [];
    });
  }

  beginAction(event: Event) {
    event.stopPropagation();
    if (this.targets.length === this.action.maxInputCount) {
      this.gameClient.execute(this.action.id, this.targets);
    } else {
      this.selection.selectAction(this.action);
      this.selection.target$.pipe(takeUntil(this.clearTargetsSource)).subscribe((target) => {
        if (this.action.allowedInputs.includes(target.id)) {
          console.log(`adding ${target.name} for ${this.action.name}`);
          this.targets.push(target.id);
          if (this.targets.length === this.action.maxInputCount) {
            this.gameClient.execute(this.action.id, this.targets);
            this.clearTargetsSource.next();
            this.selection.clearAction();
          }
        } else {
          console.log(`${target.name} is not a valid input for ${this.action.name}`);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.selectionSubscription.unsubscribe();
    this.clearTargetsSubscription.unsubscribe();
  }
}
