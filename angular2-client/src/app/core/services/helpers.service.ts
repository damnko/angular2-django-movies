import { Observable } from 'rxjs/Rx';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { config } from './../../../config';
import { UserService } from './user.service';

@Injectable()
export class HelpersService {

  constructor(
    private snackBar: MdSnackBar,
    private http: Http
  ) { }

  showMessage(body: string): void {
    this.snackBar.open(body, 'OK', {
      duration: 3000,
      extraClasses: ['error']
    });
  }

  getCsrf(): Observable<any> {
    const options = new RequestOptions({ withCredentials: true });
    const csrfToken = localStorage.getItem('csrftoken');
    if (!csrfToken) {
      return this.http.get(`${config.api}/movies/auth/csrf`, options)
        .first()
        .map(res => res.json())
        .do(res => localStorage.setItem('csrftoken', res.data));
    }
    return Observable.of(csrfToken);
  }

  createHeaders(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': localStorage.getItem('csrftoken')
    });
    const options = new RequestOptions({ headers, withCredentials: true });
    return options;
  }
}
