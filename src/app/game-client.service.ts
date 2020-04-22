import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GameClientService implements OnDestroy {
  private socket: WebSocketSubject<any> = webSocket('ws://localhost:8887');

  constructor() {
    this.socket.subscribe(
      (msg) => console.log(msg),
      (err) => console.error(err),
      () => console.log('closed'));
  }

  ngOnDestroy(): void {
    this.socket.complete();
  }

  subscribe(next: (value: any) => void) {
    this.socket.subscribe(next);
  }

  execute(actionId: number, args: number[] = []) {
    this.sendMessage('execute', [actionId, ...args]);
  }

  requestWorld() {
    this.sendMessage('world');
  }

  private sendMessage(command: string, args: number[] = []) {
    this.socket.next({command, args});
    console.log(`sent ${command}: ${args}`);
  }
}
