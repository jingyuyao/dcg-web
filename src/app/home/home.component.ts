import { Component, OnInit } from '@angular/core';
import { GameClientService } from '../game-client.service';
import { Observable } from 'rxjs';
import { RoomList } from '../api/room-list';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  name = new FormControl('');
  roomList$: Observable<RoomList>;
  roomListColumns = ['name', 'state', 'playerCount', 'join'];

  constructor(
    private readonly router: Router,
    private readonly gameClient: GameClientService
  ) {}

  ngOnInit(): void {
    this.roomList$ = this.gameClient.getRoomList();
  }

  join(roomName: string) {
    this.router.navigate(['/room', roomName], {
      queryParams: { playerName: this.name.value },
    });
  }
}
