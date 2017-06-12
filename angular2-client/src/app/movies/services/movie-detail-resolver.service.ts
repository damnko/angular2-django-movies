import { MoviesService } from './../../core/services/movies.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieDetailResolver implements Resolve<any> {

  constructor(
    private movies: MoviesService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.movies.getMovieDetails(id).first()
      .catch((err: any) => {
        const errCode = err.json().status_code;
        let message = '';
        switch (errCode) {
          case 7:
            message = 'There was an error with The Movie Database API';
            break;
          case 34:
            message = `The movie with id ${id} could not be found`;
            break;
          default:
            message = `There was an error while searching for movie with id ${id}`;
            break;
        }
        localStorage.setItem('error', message);

        console.log('error', err.json());
        this.router.navigate(['/']);
        return Observable.of(null);
      });
  }
}
