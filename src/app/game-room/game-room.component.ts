import { Component, OnInit } from '@angular/core';
import { GameClientService } from '../game-client.service';
import { GameRoomView } from '../api/game-room-view';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AttachmentView } from '../api/attachment-view';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.sass'],
})
export class GameRoomComponent implements OnInit {
  attachmentView$: Observable<AttachmentView>;
  roomView$: Observable<GameRoomView>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.attachmentView$ = this.gameClient.attachmentView$;
    this.roomView$ = this.gameClient.roomView$;
    this.route.paramMap.subscribe((params) => {
      const roomName = params.get('roomName');
      this.gameClient.joinRoom(roomName);
    });
  }

  start() {
    this.gameClient.startGame();
  }
}
