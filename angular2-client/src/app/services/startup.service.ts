import { Cookie } from 'ng2-cookies';
import { Http } from '@angular/http';
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
    const csrfToken = Cookie.get('csrftoken');
    if (!csrfToken) {
      return this.http.get(`${config.api}/movies/auth/csrf`, { withCredentials: true })
        .first();
    }
    return Observable.of(null);
  }
}
