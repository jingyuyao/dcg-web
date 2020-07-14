import { Directive, Input, HostBinding } from '@angular/core';
import { PlayerView } from './api/player-view';

@Directive({
  selector: '[appEntity]'
})
export class EntityDirective {
  @Input() ownerId: number;
  @Input() players: PlayerView[];
  @HostBinding('class.player-none') get isPlayerNone() {
    return this.ownerId === -1;
  }
  @HostBinding('class.player-0') get isPlayerZero() {
    return this.isIndex(0);
  }
  @HostBinding('class.player-1') get isPlayerOne() {
    return this.isIndex(1);
  }
  @HostBinding('class.player-2') get isPlayerTwo() {
    return this.isIndex(2);
  }
  @HostBinding('class.player-3') get isPlayerThree() {
    return this.isIndex(3);
  }

  constructor() { }

  private isIndex(index: number): boolean {
    return this.players.findIndex((p) => p.id === this.ownerId) === index;
  }
}
