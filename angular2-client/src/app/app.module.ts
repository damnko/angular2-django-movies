import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './movies/movies.module';
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    // TODO: check why this is not working and eventually move to SharedModule
    // BrowserAnimationsModule
    MoviesModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
