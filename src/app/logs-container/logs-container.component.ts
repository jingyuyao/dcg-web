import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GameView } from '../api/game-view';
import { GameClientService } from '../game-client.service';
import { LogView } from '../api/log-view';

@Component({
  selector: 'app-logs-container',
  templateUrl: './logs-container.component.html',
  styleUrls: ['./logs-container.component.sass'],
})
export class LogsContainerComponent implements OnInit {
  @Input() gameview$: Observable<GameView>;
  logs: LogView[] = [];

  constructor(private readonly gameClient: GameClientService) {}

  ngOnInit(): void {
    this.gameview$.subscribe(() => {
      this.gameClient.getGameLogs(this.logs.length).subscribe((logsView) => {
        this.logs = [...this.logs, ...logsView.logs];
      });
    });
  }
}
