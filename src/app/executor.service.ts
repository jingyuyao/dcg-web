import { Injectable } from '@angular/core';
import { GameClientService } from './game-client.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutorService {
  private currentActionId?: number;
  private args: number[] = [];

  constructor(private gameClient: GameClientService) { }

  beginAction(id: number) {
    console.log(`begin action ${id}`);
    // Very stupid, the second time an action is begun we send the command.
    if (this.currentActionId === id) {
      this.gameClient.execute(this.currentActionId, this.args);
      this.currentActionId = undefined;
    } else {
      this.currentActionId = id;
    }
    this.args = [];
  }

  addArg(arg: number) {
    console.log(`add arg ${arg}`);
    this.args.push(arg);
  }
}
