import { Component, OnInit, Input } from '@angular/core';
import { WorldView } from '../api/world-view';

@Component({
  selector: 'app-game-world',
  templateUrl: './game-world.component.html',
  styleUrls: ['./game-world.component.sass'],
})
export class GameWorldComponent implements OnInit {
  // TODO: need to show played units as voidbindable
  @Input() worldView: WorldView;

  constructor() {}

  ngOnInit(): void {}
}
