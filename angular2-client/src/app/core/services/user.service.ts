import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  getOrSetUsername(): string {
    let username = localStorage.getItem('username');
    if (!username) {
      username = btoa(Math.random().toString());
      localStorage.setItem('username', username);
    }
    return username;
  }
}
