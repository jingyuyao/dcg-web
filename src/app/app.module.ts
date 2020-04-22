import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { UnitComponent } from './unit/unit.component';
import { ActionComponent } from './action/action.component';
import { TargetableDirective } from './targetable.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    UnitComponent,
    ActionComponent,
    TargetableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
