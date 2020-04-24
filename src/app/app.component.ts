import { Component } from '@angular/core';
import { Card, fromCardEntity } from './card/card';
import { Player, fromPlayerEntity } from './player/player';
import { Unit, fromUnitEntity } from './unit/unit';
import { fromActionEntity } from './action/action';
import { GameClientService } from './game-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  world: any = {};
  players: Player[] = [];
  seekPowers: Card[] = [];
  forgeRow: Card[] = [];
  attackingUnits: Unit[] = [];
  defendingUnits: Unit[] = [];
  // TODO: need to show played units as voidbindable
  playArea: Card[] = [];

  constructor(private gameClient: GameClientService) {
    gameClient.subscribe((world) => this.handleUpdate(world));
    gameClient.requestWorld();
  }

  private handleUpdate(world: any) {
    this.world = world;
    this.players = [];
    this.seekPowers = [];
    this.forgeRow = [];
    this.attackingUnits = [];
    this.defendingUnits = [];
    this.playArea = [];
    for (const [idString, entity] of Object.entries<any>(world.entities)) {
      const id = Number(idString);
      const archetype: number = entity.archetype;
      const tags: string[] = world.archetypes[archetype];
      // TODO: this seems awfully bad, perhaps use a ThroneDeck marker?
      if (tags.includes('SeekPower') && !tags.includes('Owned')) {
        this.seekPowers.push(fromCardEntity(id, entity, tags));
      } else if (tags.includes('Player')) {
        this.players.push(fromPlayerEntity(id, entity));
      } else if (tags.includes('Card') && tags.includes('ForgeRow')) {
        this.forgeRow.push(fromCardEntity(id, entity, tags));
      } else if (
        tags.includes('Card') &&
        tags.includes('PlayArea') &&
        (tags.includes('Basic') || tags.includes('Spell'))
      ) {
        this.playArea.push(fromCardEntity(id, entity, tags));
      } else if (tags.includes('Unit')) {
        if (tags.includes('Attacking')) {
          this.attackingUnits.push(fromUnitEntity(id, entity));
        } else {
          this.defendingUnits.push(fromUnitEntity(id, entity));
        }
      }
    }
    const displayed = [
      ...this.players,
      ...this.seekPowers,
      ...this.forgeRow,
      ...this.attackingUnits,
      ...this.defendingUnits,
      ...this.playArea,
    ];
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
