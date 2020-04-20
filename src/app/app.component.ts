import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Card, fromCardEntity } from './card/card';
import { Player, fromPlayerEntity } from './player/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'dcg-web';
  world: any = {};
  players: Player[] = [];
  forgeRow: Card[] = [];
  units: any[] = [];
  playedSpells: any[] = [];
  actionMap: Map<string, any> = new Map();
  private socket: WebSocketSubject<any> = webSocket('ws://localhost:8887');

  ngOnInit() {
    this.socket.subscribe(
      (msg) => this.handleUpdate(msg),
      (err) => console.error(err),
      () => console.log('closed'));
    console.log(this.socket);
    this.sendMessage('world');
  }

  selectEntity(id: string) {
    console.log(id);
  }

  private handleUpdate(world: any) {
    console.dir(world);
    this.world = world;
    this.players = [];
    this.forgeRow = [];
    this.units = [];
    this.playedSpells = [];
    this.actionMap = new Map();
    for (const [id, entity] of Object.entries<any>(world.entities)) {
      const archetype = entity.archetype;
      const components = world.archetypes[archetype];
      if (components.includes('Player')) {
        this.players.push(fromPlayerEntity(id, entity));
      } else if (components.includes('Card') && components.includes('ForgeRow')) {
        this.forgeRow.push(fromCardEntity(id, entity));
      } else if (components.includes('Unit')) {
        this.units.push(entity);
      } else if (components.includes('Spell')) {
        this.playedSpells.push(entity);
      } else if (components.includes('Action')) {
        const ownerId = entity.components.Owned.owner;
        const actions = this.actionMap.has(ownerId) ? this.actionMap.get(ownerId) : [];
        actions.push(entity);
        this.actionMap.set(ownerId, actions);
      } else {
        console.log(`Unknown entity ${entity}`);
      }
    }
  }

  private sendMessage(command: string, args: number[] = []) {
    this.socket.next({command, arguments: args});
  }
}
