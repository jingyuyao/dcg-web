import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'dcg-web';
  world = {};
  private subject: WebSocketSubject<any> = webSocket('ws://localhost:8887');

  ngOnInit() {
    this.subject.subscribe(
      (msg) => this.handleUpdate(msg),
      (err) => console.error(err),
      () => console.log('closed'));
    this.sendMessage('world');
  }

  private handleUpdate(world: any) {
    this.world = world;
  }

  private sendMessage(command: string, args: number[] = []) {
    this.subject.next({command, arguments: args});
  }
}
