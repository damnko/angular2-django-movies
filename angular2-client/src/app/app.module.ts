import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HelpersService } from './core/services';
import { StartupService } from './services/startup.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './movies/movies.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// global styles
import '../styles/styles.scss';

export function startServiceFactory(ss: StartupService): () => Promise<any> {
  return () => ss.load();
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MoviesModule,
    SharedModule,
    CoreModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    StartupService,
    // service to get csrf token cookie from server before app initialization
    // otherwise each call to the django server will return a '403 Forbidden' error
    {
      provide: APP_INITIALIZER,
      useFactory: startServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ]
})
export class AppModule { }
