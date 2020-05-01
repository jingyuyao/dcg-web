import { Component, Input } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent {
  // TODO: need to show played units as voidbindable
  @Input() gameview$: Observable<GameView>;
}
