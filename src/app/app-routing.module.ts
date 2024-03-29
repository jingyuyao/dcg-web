import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameRoomComponent } from './game-room/game-room.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room/:roomName', component: GameRoomComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
