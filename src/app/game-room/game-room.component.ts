import { Component, OnInit } from '@angular/core';
import { GameClientService } from '../game-client.service';
import { RoomView } from '../api/room-view';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorldView } from '../api/world-view';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.sass'],
})
export class GameRoomComponent implements OnInit {
  name = new FormControl('');
  roomView?: RoomView;
  isJoined = false;
  worldView?: WorldView;

  constructor(private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.gameClient.worldView$
      .pipe(first())
      .subscribe((worldView) => (this.worldView = worldView));
    this.gameClient.roomView$.subscribe(
      (roomView) => (this.roomView = roomView)
    );
    this.gameClient.requestRoomView();
  }

  join() {
    if (this.name.value) {
      this.gameClient.join(this.name.value);
      this.isJoined = true;
    }
  }
}
