import { Cookie } from 'ng2-cookies';
import { AuthHttp } from 'angular2-jwt';
import { HelpersService } from './helpers.service';
import { UserService } from './user.service';
import { config } from './../../../config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class MoviesService {

  constructor(
    private http: Http,
    private us: UserService,
    private hs: HelpersService,
    private auth: AuthHttp
  ) { }

  moviesFromDate(format?: string): Date | string {
    const daysAgo = 30;
    const date = moment().subtract(daysAgo, 'days');

    if (format) {
      return date.format(format);
    }
    return date.toDate();
  }

  getTopMovies(): any {
    const baseUrl = `${config.themoviedb.endpoint}/discover/movie?`;
    const params = [
      `api_key=${config.themoviedb.apiKey}`,
      `include_adult=false`,
      `release_date.gte=${this.moviesFromDate('YYYY-MM-DD')}`,
      `sort_by=popularity.desc`
    ].join('&');

    return this.http.get(`${baseUrl}${params}`)
      .map(res => res.json())
      .flatMap(res => {
        const ids = res.results.map((movie: any) => movie.id);
        return this.getMoviesSummary(ids, res);
      }).do(console.log)
      .map(({ tmdb, api }) => {
        // populate each field with custom data from backend api
        tmdb.results.forEach((movie: any) => {
          movie['custom_data'] = api.data.movies[movie.id];
        });

        return tmdb;
      }).do(console.log);
  }

  getMovieDetails(id: string): Observable<any> {
    const url = `${config.themoviedb.endpoint}/movie/${id}?api_key=${config.themoviedb.apiKey}`;

    return this.http.get(url)
      .map(res => res.json());
  }

  getMovieInternalDetails(id: string): Observable<any> {
    return this.http.get(`/api/movies/movie/${id}/`)
      .map((res: any) => res.json());
  }

  rateMovie(id: string, rating: number): Observable<any> {
    const url = `/api/movies/rate`;
    console.log('csrf token is', Cookie.get('csrftoken'));
    // check if user is logged in
    return this.us.user$
      .first()
      .flatMap(user => {
        if (user) {
          return this.auth.post(url, { id, rating });
        }
        return this.postRequest(url, { id, rating });
      });
  }

  getMovieRating(id: string): Observable<any> {
    const url = `/api/movies/movie/${id}/rating/`;
    return this.postRequest(url, {});
  }

  removeRating(id: string): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUsername()}`,
      `m_id=${id}`
    ].join('&');

    const options = this.hs.createHeaders();

    return this.http.delete(`/api/movies/rate?${params}`, options)
      .map(res => res.json());
  }

  getComments(id: string, page: number): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUsername()}`,
      `p=${page}`
    ].join('&');

    return this.http.get(`/api/movies/movie/${id}/comments/?${params}`)
      .map(res => res.json());
  }

  postComment(id: string, body: string): Observable<any> {
    const url = `/api/movies/comment`;
    // check if user is logged in
    return this.us.user$
      .first()
      .flatMap(user => {
        if (user) {
          return this.auth.post(url, { id, body });
        }
        return this.postRequest(url, { id, body });
      });
  }

  removeComment(id: string): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUsername()}`,
      `id=${id}`
    ].join('&');

    return this.http.delete(`/api/movies/comment?${params}`)
      .map(res => res.json());
  }

  private getMoviesSummary(movieIds: string[], tmdbRes: any): Observable<{tmdb: any, api: any}> {
    return Observable.combineLatest(
      Observable.of(tmdbRes),
      this.http.get(`/api/movies/get-all?ids=${movieIds.join(',')}`).map((api: any) => api.json()),
      (tmdb, api) => {
        return {
          tmdb,
          api
        };
      }
    );
  }

  private postRequest(url: string, data: any): Observable<any> {
    const username = this.us.getOrSetUsername();

    const options = this.hs.createHeaders();

    return this.http.post(url, Object.assign({ username }, data), options)
      .map(res => res.json());
  }

}
