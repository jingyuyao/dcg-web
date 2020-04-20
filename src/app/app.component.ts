import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'dcg-web';
  world: any = {};
  players: any[] = [];
  forgeRow: any[] = [];
  units: any[] = [];
  playedSpells: any[] = [];
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
    this.players = [];
    this.forgeRow = [];
    this.units = [];
    this.playedSpells = [];
    for (const [id, entity] of Object.entries<any>(world.entities)) {
      const archetype = entity.archetype;
      const components = world.archetypes[archetype];
      if (components.includes('Player')) {
        this.players.push(entity);
      } else if (components.includes('Card') && components.includes('ForgeRow')) {
        this.forgeRow.push(entity);
      } else if (components.includes('Unit')) {
        this.units.push(entity);
      } else if (components.includes('Spell')) {
        this.playedSpells.push(entity);
      } else {
        console.log(`Unknown entity ${entity}`);
      }
    }
  }

  private sendMessage(command: string, args: number[] = []) {
    this.subject.next({command, arguments: args});
  }
}
