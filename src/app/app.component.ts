import { Component } from '@angular/core';
import { Card, fromCardEntity } from './card/card';
import { Player, fromPlayerEntity } from './player/player';
import { Unit, fromUnitEntity } from './unit/unit';
import { fromActionEntity } from './action/action';
import { GameClientService } from './game-client.service';
import { ExecutorService } from './executor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  world: any = {};
  players: Player[] = [];
  forgeRow: Card[] = [];
  attackingUnits: Unit[] = [];
  defendingUnits: Unit[] = [];
  spells: Card[] = [];

  constructor(private gameClient: GameClientService, private executor: ExecutorService) {
    gameClient.subscribe((world) => this.handleUpdate(world));
    gameClient.requestWorld();
  }

  selectEntity(id: number) {
    this.executor.addArg(id);
  }

  private handleUpdate(world: any) {
    console.dir(world);
    this.world = world;
    this.players = [];
    this.forgeRow = [];
    this.attackingUnits = [];
    this.defendingUnits = [];
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
        if (tags.includes('Attacking')) {
          this.attackingUnits.push(fromUnitEntity(id, entity));
        } else {
          this.defendingUnits.push(fromUnitEntity(id, entity));
        }
      } else if (tags.includes('Spell')) {
        this.spells.push(fromCardEntity(id, entity));
      }
    }
    const displayed = [...this.players, ...this.forgeRow, ...this.attackingUnits, ...this.defendingUnits, ...this.spells];
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
}
