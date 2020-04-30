import { Component, OnInit } from '@angular/core';
import { GameClientService } from '../game-client.service';
import { Observable } from 'rxjs';
import { RoomList } from '../api/room-list';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  name = new FormControl('');
  roomList$: Observable<RoomList>;

  constructor(
    private readonly router: Router,
    private readonly gameClient: GameClientService) { }

  ngOnInit(): void {
    this.roomList$ = this.gameClient.getRoomList();
  }

  join(roomName: string) {
    this.gameClient.initAttachment(this.name.value).subscribe((attachment) => {
      if (attachment.name) {
        this.router.navigate(['/room', roomName]);
      }
    });
  }
}
