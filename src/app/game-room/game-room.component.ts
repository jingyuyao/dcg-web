import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameClientService } from '../game-client.service';
import { GameRoomView } from '../api/game-room-view';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, ReplaySubject } from 'rxjs';
import { AttachmentView } from '../api/attachment-view';
import { ServerMessageKind } from '../api/server-message';
import { GameView } from '../api/game-view';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.sass'],
})
export class GameRoomComponent implements OnInit, OnDestroy {
  attachmentView$ = new ReplaySubject<AttachmentView>();
  roomView$ = new ReplaySubject<GameRoomView>();
  gameView$ = new ReplaySubject<GameView>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameClient: GameClientService
  ) {}

  ngOnInit(): void {
    this.gameClient
      .listen(ServerMessageKind.ATTACHMENT_VIEW)
      .subscribe(this.attachmentView$);
    this.gameClient
      .listen(ServerMessageKind.GAME_ROOM_VIEW)
      .subscribe(this.roomView$);
    this.gameClient
      .listen(ServerMessageKind.GAME_VIEW)
      .subscribe(this.gameView$);

    // Only triggers join after we set up all the required subscriptions.
    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      ([param, query]) => {
        this.gameClient.joinRoom(param.roomName, query.playerName);
      }
    );
  }

  ngOnDestroy(): void {
    this.attachmentView$.complete();
    this.roomView$.complete();
    this.gameView$.complete();
    this.gameClient.leaveRoom();
  }

  start() {
    this.gameClient.startGame();
  }
}
