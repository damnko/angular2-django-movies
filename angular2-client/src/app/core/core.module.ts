import { NgModule } from '@angular/core';
// had to install animations with " yarn add @angular/animations@latest"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

import {
  NonAuthGuard,
  AuthGuard,
  HelpersService,
  UserService,
  MoviesService
} from './services';
import { SharedModule } from './../shared/shared.module';

// auth0/angular2-jwt custom configuration for csfr and token stored in cookies
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    // initially considering to store token in cookies with Set-Cookie header
    // but could not retrieve it when client and server where hosted on different domains
    // so, reverting to localStorage on final version
    // tokenGetter: (() => Cookie.get('token')),
    noTokenScheme: true, // otherwise it will put "Bearer " in front of the token
    globalHeaders: [{
      // in order for this to work I had to get the csrf token with APP_INITIALIZER on app.module.ts
      'X-CSRFToken': localStorage.getItem('csrftoken'),
    }],
  }), http, options);
}

@NgModule({
  imports: [
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HelpersService,
    MoviesService,
    UserService,
    AuthGuard,
    NonAuthGuard,
    // Does not work with themoviedb api, so it gets handled individually on each get/post request
    // { provide: XSRFStrategy, useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken') }
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class CoreModule { }
