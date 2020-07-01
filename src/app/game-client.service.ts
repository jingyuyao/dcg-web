import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map, first } from 'rxjs/operators';
import { ServerMessage, ServerMessageKind } from './api/server-message';
import { Observable } from 'rxjs';
import { ClientMessage, ClientMessageKind } from './api/client-message';
import { RoomList } from './api/room-list';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameClientService implements OnDestroy {
  private readonly socket: WebSocketSubject<any> = webSocket(
    environment.apiUrl
  );

  constructor() {
    // NOTE: We need at least one active subscription to keep the connection
    // alive. So this is more than just logging debug statements.
    this.socket.subscribe(
      (message) => {
        console.log('Received:');
        console.log(message);
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

  getRoomList(): Observable<RoomList> {
    return this.request(
      { kind: ClientMessageKind.GET_ROOM_LIST },
      ServerMessageKind.ROOM_LIST
    );
  }

  joinRoom(roomName: string, playerName: string) {
    this.sendMessage({
      kind: ClientMessageKind.JOIN_ROOM,
      strArgs: [roomName, playerName],
    });
  }

  leaveRoom() {
    this.sendMessage({ kind: ClientMessageKind.LEAVE_ROOM });
  }

  startGame() {
    this.sendMessage({ kind: ClientMessageKind.START_GAME });
  }

  execute(actionId: number, args: number[] = []) {
    this.sendMessage({
      kind: ClientMessageKind.EXECUTE_ACTION,
      intArgs: [actionId, ...args],
    });
  }

  /**
   * Listens for server response of the specified kind. Remember this returns a
   * `cold` observable until it is subscribed to.
   */
  listen<T>(resultKind: ServerMessageKind): Observable<T> {
    return this.socket.pipe(
      filter((msg: ServerMessage) => msg.kind === resultKind),
      map((msg: ServerMessage) => msg.data as T)
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
    const listener: Observable<T> = this.listen(resultKind);
    return listener.pipe(first());
  }

  private sendMessage(message: ClientMessage) {
    console.log('Sending:');
    console.log(message);
    this.socket.next(message);
  }
}
