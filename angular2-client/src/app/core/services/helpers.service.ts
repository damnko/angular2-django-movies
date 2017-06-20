import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class HelpersService {

  constructor(
    private snackBar: MdSnackBar,
    private http: Http
  ) { }

  showMessage(body: string): void {
    this.snackBar.open(body);
  }

  getCsrf(): Observable<any> {
    const csrfToken = Cookie.get('csrftoken');
    if (!csrfToken) {
      return this.http.get(`/api/movies/auth/csrf`)
        .first();
        // .subscribe(res => console.log('ok registered csrf cookie', Cookie.get('csrftoken')));
    }
    return Observable.of(csrfToken);
  }

  createHeaders(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookie.get('csrftoken')
    });
    const options = new RequestOptions({ headers });
    return options;
  }
}
