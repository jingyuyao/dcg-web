import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { filter, map } from 'rxjs/operators';
import { ServerMessage } from './api/server-message';
import { WorldView } from './api/world-view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameClientService implements OnDestroy {
  private socket: WebSocketSubject<any> = webSocket('ws://localhost:8888');
  worldView$: Observable<WorldView> = this.socket.pipe(
    filter((msg: ServerMessage) => msg.kind === 'worldview'),
    map((msg: ServerMessage) => msg.data as WorldView),
  );

  constructor() {}

  ngOnDestroy(): void {
    this.socket.complete();
  }

  execute(actionId: number, args: number[] = []) {
    this.sendMessage('execute', [actionId, ...args]);
  }

  requestWorld() {
    this.sendMessage('get-world-view');
  }

  private sendMessage(kind: string, args: number[] = []) {
    this.socket.next({ kind, args });
    console.log(`sent ${kind}: ${args}`);
  }
}
