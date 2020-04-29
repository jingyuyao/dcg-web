import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map } from 'rxjs/operators';
import { ServerMessage } from './api/server-message';
import { WorldView } from './api/world-view';
import { Observable } from 'rxjs';
import { RoomView } from './api/room-view';

@Injectable({
  providedIn: 'root',
})
export class GameClientService implements OnDestroy {
  private socket: WebSocketSubject<any> = webSocket('ws://localhost:8888');
  private name?: string;
  roomView$: Observable<RoomView> = this.socket.pipe(
    filter((msg: ServerMessage) => msg.kind === 'room-view'),
    map((msg: ServerMessage) => msg.data as RoomView),
  );
  worldView$: Observable<WorldView> = this.socket.pipe(
    filter((msg: ServerMessage) => msg.kind === 'world-view'),
    map((msg: ServerMessage) => msg.data as WorldView),
  );

  constructor() {}

  ngOnDestroy(): void {
    this.socket.complete();
  }

  join(name: string) {
    this.name = name;
    this.sendMessage('join');
  }

  execute(actionId: number, args: number[] = []) {
    this.sendMessage('execute', [actionId, ...args]);
  }

  requestRoomView() {
    this.sendMessage('get-room-view');
  }

  requestWorld() {
    this.sendMessage('get-world-view');
  }

  private sendMessage(kind: string, args: number[] = []) {
    this.socket.next({ name: this.name, kind, args });
    console.log(`sent ${kind}: ${args}`);
  }
}
