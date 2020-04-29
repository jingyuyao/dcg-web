import { Component, OnInit, Input } from '@angular/core';
import { WorldView } from '../api/world-view';
import { GameClientService } from '../game-client.service';

@Component({
  selector: 'app-game-world',
  templateUrl: './game-world.component.html',
  styleUrls: ['./game-world.component.sass'],
})
export class GameWorldComponent implements OnInit {
  @Input() worldView: WorldView;
  // TODO: need to show played units as voidbindable

  constructor(private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.gameClient.worldView$.subscribe(
      (worldView) => (this.worldView = worldView)
    );
  }
}
