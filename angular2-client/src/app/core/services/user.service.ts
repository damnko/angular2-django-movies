import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(
    private http: Http
  ) { }

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
}
