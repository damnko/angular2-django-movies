import { Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { config } from './../../config';

@Injectable()
export class StartupService {

  constructor(
    private http: Http
  ) { }

  load(): Promise<any> {
    return this.getCsrf()
      .toPromise()
      .catch(() => Promise.resolve());
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
}
