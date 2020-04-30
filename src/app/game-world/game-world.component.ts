import { Component, OnInit } from '@angular/core';
import { GameView } from '../api/game-view';
import { Observable } from 'rxjs';
import { GameClientService } from '../game-client.service';

@Component({
  selector: 'app-game-world',
  templateUrl: './game-world.component.html',
  styleUrls: ['./game-world.component.sass'],
})
export class GameWorldComponent implements OnInit {
  // TODO: need to show played units as voidbindable
  gameview$: Observable<GameView>;

  constructor(private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.gameview$ = this.gameClient.gameview$;
  }
}
