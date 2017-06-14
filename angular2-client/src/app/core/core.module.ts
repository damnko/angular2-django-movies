import { SharedModule } from './../shared/shared.module';
import { HelpersService } from './services/helpers.service';
import { UserService } from './services/user.service';
import { MoviesService } from './services/movies.service';
import { NgModule } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// had to install animations with " yarn add @angular/animations@latest"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    MoviesService,
    UserService,
    HelpersService,
    CookieService
    // Does not work with themoviedb api, so it gets handled individually on each get/post request
    // { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken') }
  ]
})
export class CoreModule { }
