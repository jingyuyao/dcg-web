import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map, first, shareReplay } from 'rxjs/operators';
import { ServerMessage, ServerMessageKind } from './api/server-message';
import { GameView } from './api/game-view';
import { Observable } from 'rxjs';
import { GameRoomView } from './api/game-room-view';
import { AttachmentView } from './api/attachment-view';
import { ClientMessage, ClientMessageKind } from './api/client-message';
import { RoomList } from './api/room-list';

@Injectable({
  providedIn: 'root',
})
export class GameClientService implements OnDestroy {
  private readonly socket: WebSocketSubject<any> = webSocket(
    'ws://localhost:8888'
  );
  attachmentView$: Observable<AttachmentView> = this.listen(
    ServerMessageKind.ATTACHMENT_VIEW
  );
  roomView$: Observable<GameRoomView> = this.listen(ServerMessageKind.GAME_ROOM_VIEW);
  gameview$: Observable<GameView> = this.listen(ServerMessageKind.GAME_VIEW);

  constructor() {
    // NOTE: We need at least one active subscription to keep the connection
    // alive. So this is more than just loggign logging debug statements.
    this.socket.subscribe(
      (message) => {
        console.log('Received:');
        console.log(JSON.stringify(message, undefined, 2));
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('Connection ended');
      }
    );
  }

  ngOnDestroy(): void {
    this.socket.complete();
  }

  initAttachment(name: string): Observable<AttachmentView> {
    return this.request(
      {
        kind: ClientMessageKind.INIT_ATTACHMENT,
        strArgs: [name],
      },
      ServerMessageKind.ATTACHMENT_VIEW
    );
  }

  getRoomList(): Observable<RoomList> {
    return this.request(
      { kind: ClientMessageKind.GET_ROOM_LIST },
      ServerMessageKind.ROOM_LIST
    );
  }

  joinRoom(roomName: string): Observable<GameRoomView> {
    return this.request(
      {
        kind: ClientMessageKind.JOIN_ROOM,
        strArgs: [roomName],
      },
      ServerMessageKind.GAME_ROOM_VIEW
    );
  }

  leaveRoom(): Observable<AttachmentView> {
    return this.request(
      { kind: ClientMessageKind.LEAVE_ROOM },
      ServerMessageKind.ATTACHMENT_VIEW
    );
  }

  startGame(): Observable<GameView> {
    return this.request(
      { kind: ClientMessageKind.START_GAME },
      ServerMessageKind.GAME_VIEW
    );
  }

  execute(actionId: number, args: number[] = []): Observable<GameView> {
    return this.request(
      {
        kind: ClientMessageKind.EXECUTE_ACTION,
        intArgs: [actionId, ...args],
      },
      ServerMessageKind.GAME_VIEW
    );
  }

  /**
   * Listens for server response of the specified kind and replays the last
   * value received.
   */
  private listen<T>(resultKind: ServerMessageKind): Observable<T> {
    return this.socket.pipe(
      filter((msg: ServerMessage) => msg.kind === resultKind),
      map((msg: ServerMessage) => msg.data as T),
      shareReplay(1)
    );
  }

  /**
   * Sends the message and returns the first server response of the specified
   * kind.
   */
  private request<T>(
    message: ClientMessage,
    resultKind: ServerMessageKind
  ): Observable<T> {
    this.sendMessage(message);
    return this.socket.pipe(
      filter((msg: ServerMessage) => msg.kind === resultKind),
      map((msg: ServerMessage) => msg.data as T),
      first()
    );
  }

  private sendMessage(message: ClientMessage) {
    console.log('Sending:');
    console.log(JSON.stringify(message, undefined, 2));
    this.socket.next(message);
  }
}
