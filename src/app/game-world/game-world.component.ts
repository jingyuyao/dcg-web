import { Component, OnInit } from '@angular/core';
import { WorldView } from '../api/world-view';
import { Observable } from 'rxjs';
import { GameClientService } from '../game-client.service';

@Component({
  selector: 'app-game-world',
  templateUrl: './game-world.component.html',
  styleUrls: ['./game-world.component.sass'],
})
export class GameWorldComponent implements OnInit {
  // TODO: need to show played units as voidbindable
  worldView$: Observable<WorldView>;

  constructor(private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.worldView$ = this.gameClient.worldView$;
  }
}
