import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { meetingsReducer } from './_modules/meetings/_store/meetings.reducers';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    /* ngrx */
    StoreModule.forRoot({ meetings: meetingsReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
