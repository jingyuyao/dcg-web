import { Component, Input, OnDestroy, HostBinding } from '@angular/core';
import { Card } from './card';
import { Subscription } from 'rxjs';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnDestroy {
  private actionSubsciption: Subscription;
  private targetSubscription: Subscription;
  @Input() card: Card;
  @HostBinding('class.targetable') targetable = false;
  @HostBinding('class.targetted') targetted = false;

  constructor(private selection: SelectionService) {
    this.actionSubsciption = selection.action$.subscribe((action) => {
      this.targetted = false;
      this.targetable = action && action.allowedInputs.includes(this.card.id);
    });
    this.targetSubscription = selection.target$.subscribe((target) => {
      if (this.card === target) {
        this.targetable = false;
        this.targetted = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.actionSubsciption.unsubscribe();
    this.targetSubscription.unsubscribe();
  }
}
