import { Component, OnDestroy, Input, HostBinding } from '@angular/core';
import { Player } from './player';
import { Subscription } from 'rxjs';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass']
})
export class PlayerComponent implements OnDestroy {
  private actionSubsciption: Subscription;
  private targetSubscription: Subscription;
  @Input() player: Player;
  @HostBinding('class.targetable') targetable = false;
  @HostBinding('class.targetted') targetted = false;

  constructor(private selection: SelectionService) {
    this.actionSubsciption = selection.action$.subscribe((action) => {
      this.targetted = false;
      this.targetable = action && action.allowedInputs.includes(this.player.id);
    });
    this.targetSubscription = selection.target$.subscribe((target) => {
      if (this.player === target) {
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
