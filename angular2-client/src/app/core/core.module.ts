import { NonAuthGuard } from './services/non-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { HelpersService } from './services/helpers.service';
import { UserService } from './services/user.service';
import { MoviesService } from './services/movies.service';
import { NgModule } from '@angular/core';
// had to install animations with " yarn add @angular/animations@latest"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { XSRFStrategy, CookieXSRFStrategy } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies';

// auth0/angular2-jwt custom configuration for csfr and token stored in cookies
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => Cookie.get('token')),
    noTokenScheme: true, // otherwise it will put "Bearer " in front of the token
    globalHeaders: [{
      'X-CSRFToken': Cookie.get('csrftoken'),
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
