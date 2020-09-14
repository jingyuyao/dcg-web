import { Directive, Input, HostBinding, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService } from './selection.service';

@Directive({
  selector: '[appTargetable]'
})
export class TargetableDirective implements OnDestroy {
  private actionSubsciption: Subscription;
  private targetSubscription: Subscription;
  @Input() entityId?: number;
  @HostBinding('class.targetable') targetable = false;
  @HostBinding('class.targetted') targetted = false;

  constructor(private selection: SelectionService) {
    this.actionSubsciption = selection.action$.subscribe((action) => {
      this.targetted = false;
      this.targetable = action && action.allowedTargets.includes(this.entityId);
    });
    this.targetSubscription = selection.target$.subscribe((entityId) => {
      if (this.entityId === entityId) {
        this.targetted = true;
      }
    });
  }

  @HostListener('click') onClick() {
    if (this.targetable && !this.targetted) {
      this.selection.selectTarget(this.entityId);
    }
  }

  ngOnDestroy(): void {
    this.actionSubsciption.unsubscribe();
    this.targetSubscription.unsubscribe();
  }
}
