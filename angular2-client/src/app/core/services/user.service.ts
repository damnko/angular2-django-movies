import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { JwtHelper, AuthHttp } from 'angular2-jwt';

import { HelpersService } from './helpers.service';
import { config } from './../../../config';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  user$ = new BehaviorSubject<any>(this.getAuthDetails());
  user: any = false;

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
    let username = this.user.username || localStorage.getItem('username');
    if (!username) {
      username = btoa(Math.random().toString());
      localStorage.setItem('username', username);
    }
    return username;
  }

  usernameIsUnique(username: string): Observable<boolean> {
    return this.http.get(`${config.api}/movies/auth/username-exists/?u=${username}`)
      .first()
      .map(res => res.json())
      .map(res => !res.data.username_exists);
  }

  register(formData: any): Observable<any> {
    return this.authPost(`${config.api}/movies/auth/register/`, formData)
      .do(res => this.setToken(res.data));
  }

  login(formData: any): Observable<any> {
    return this.authPost(`${config.api}/movies/auth/login/`, formData)
      .do(res => this.setToken(res.data));
  }

  editProfile(formData: any): Observable<any> {
    // need to set withCredentials to send csrf token for Django
    return this.auth.post(`${config.api}/movies/user/update/`, formData, { withCredentials: true });
  }

  editPassword(formData: any): Observable<any> {
    return this.auth.post(
      `${config.api}/movies/user/update-password/`,
      formData,
      { withCredentials: true }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    // Cookie.delete('token', '/');
    this.setUserData();
  }

  isAuth(): boolean {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return !this.jwtHelper.isTokenExpired(cookieToken);
    } else {
      return false;
    }
  }

  getAuthDetails(): any {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return this.jwtHelper.decodeToken(cookieToken);
    } else {
      return false;
    }
  }

  setUserData(): void {
    this.user$.next(this.getAuthDetails());
    this.user = this.getAuthDetails();
  }

  private setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }
}
