import { config } from './../../../config';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MoviesService {

  constructor(
    private http: Http
  ) { }

  getTopMovies(): any {
    const baseUrl = `${config.themoviedb.endpoint}/discover/movie?`;
    const params = [
      `api_key=${config.themoviedb.apiKey}`,
      `include_adult=false`,
      `release_date.gte=2017-05-01`,
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

}
