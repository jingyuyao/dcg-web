import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Card, fromCardEntity } from './card/card';
import { Player, fromPlayerEntity } from './player/player';
import { Unit, fromUnitEntity } from './unit/unit';
import { fromActionEntity } from './action/action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  private socket: WebSocketSubject<any> = webSocket('ws://localhost:8887');
  world: any = {};
  players: Player[] = [];
  forgeRow: Card[] = [];
  units: Unit[] = [];
  spells: Card[] = [];

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
    this.spells = [];
    for (const [idString, entity] of Object.entries<any>(world.entities)) {
      const id = Number(idString);
      const archetype = entity.archetype;
      const tags = world.archetypes[archetype];
      if (tags.includes('Player')) {
        this.players.push(fromPlayerEntity(id, entity));
      } else if (tags.includes('Card') && tags.includes('ForgeRow')) {
        this.forgeRow.push(fromCardEntity(id, entity));
      } else if (tags.includes('Unit')) {
        this.units.push(fromUnitEntity(id, entity));
      } else if (tags.includes('Spell')) {
        this.spells.push(fromCardEntity(id, entity));
      }
    }
    const displayed = [...this.players, ...this.forgeRow, ...this.units, ...this.spells];
    for (const [idString, entity] of Object.entries<any>(world.entities)) {
      const id = Number(idString);
      const archetype = entity.archetype;
      const tags = world.archetypes[archetype];
      if (tags.includes('Action')) {
        const ownerId = entity.components.Owned.owner;
        const owner = displayed.find((e) => e.id === ownerId);
        if (owner) {
          owner.actions.push(fromActionEntity(id, entity));
        }
      }
    }
  }

  private sendMessage(command: string, args: number[] = []) {
    this.socket.next({command, arguments: args});
  }
}
