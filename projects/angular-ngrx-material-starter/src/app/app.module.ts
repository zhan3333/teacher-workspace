import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ConfirmDialogComponent } from './shared/confirm.dialog';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    MatDialogModule
  ],
  declarations: [AppComponent, ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
