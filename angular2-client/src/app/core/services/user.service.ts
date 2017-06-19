import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HelpersService } from './helpers.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  user$ = new BehaviorSubject<any>(this.getAuthDetails());

  constructor(
    private http: Http,
    private hs: HelpersService,
    private auth: AuthHttp
  ) {
    this.setUserData();
  }

  authPost(url: string, data: any): Observable<any> {
    const options = this.hs.createHeaders();

    return this.http.post(url, data, options)
      .map(res => res.json());
  }

  getOrSetUsername(): string {
    let username = localStorage.getItem('username');
    if (!username) {
      username = btoa(Math.random().toString());
      localStorage.setItem('username', username);
    }
    return username;
  }

  usernameIsUnique(username: string): Observable<boolean> {
    return this.http.get(`/api/movies/auth/username-exists/?u=${username}`)
      .map(res => res.json())
      .map(res => !res.data.username_exists);
  }

  register(formData: any): Observable<any> {
    return this.authPost(`/api/movies/auth/register/`, formData);
  }

  login(formData: any): Observable<any> {
    return this.authPost(`/api/movies/auth/login/`, formData);
  }

  editProfile(formData: any): Observable<any> {
    const req = this.auth.post(`/api/movies/user/update/`, formData);
    this.auth.setGlobalHeaders([{'X-CSRFToken': Cookie.get('csrftoken')}], req);
    return req;
  }

  editPassword(formData: any): Observable<any> {
    return this.auth.post(`/api/movies/user/update-password/`, formData);
  }

  logout(): void {
    Cookie.delete('token');
    this.setUserData();
  }

  isAuth(): boolean {
    const cookieToken = this.getCookieToken();
    if (cookieToken) {
      return !this.jwtHelper.isTokenExpired(cookieToken);
    } else {
      return false;
    }
  }

  getAuthDetails(): any {
    const cookieToken = this.getCookieToken();
    if (cookieToken) {
      return this.jwtHelper.decodeToken(cookieToken);
    } else {
      return false;
    }
  }

  setUserData(): void {
    console.log('setuserdata called');
    this.user$.next(this.getAuthDetails());
  }

  private getCookieToken(): string {
    return Cookie.get('token');
  }
}
