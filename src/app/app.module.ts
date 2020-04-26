import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { UnitComponent } from './unit/unit.component';
import { ActionComponent } from './action/action.component';
import { TargetableDirective } from './targetable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    UnitComponent,
    ActionComponent,
    TargetableDirective,
    ActionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
