import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { ActionComponent } from './action/action.component';
import { TargetableDirective } from './targetable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActionsComponent } from './actions/actions.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { GameComponent } from './game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardContainerComponent } from './card-container/card-container.component';
import { PlayerContainerComponent } from './player-container/player-container.component';
import { EntityDirective } from './entity.directive';
import { LogsContainerComponent } from './logs-container/logs-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameRoomComponent,
    GameComponent,
    CardComponent,
    PlayerComponent,
    ActionComponent,
    ActionsComponent,
    TargetableDirective,
    CardContainerComponent,
    PlayerContainerComponent,
    EntityDirective,
    LogsContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
