import { Component } from '@angular/core';
import { GameClientService } from './game-client.service';
import { WorldView } from './api/world-view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  worldView?: WorldView;
  // TODO: need to show played units as voidbindable

  constructor(private gameClient: GameClientService) {
    gameClient.worldView$.subscribe((worldView) => this.worldView = worldView);
    gameClient.requestWorld();
  }
}
