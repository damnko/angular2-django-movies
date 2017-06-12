import { Http } from '@angular/http';
import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'movie-list',
  templateUrl: 'movie-list.component.html'
})

export class MovieListComponent implements OnInit {

  public topMovies$: Observable<any>;

  constructor(
    private movies: MoviesService,
    private http: Http
  ) { }

  ngOnInit() {
    this.topMovies$ = this.movies.getTopMovies();
  }

  testapi(): void {
    this.http.get('/api/movies/get-all?ids=15sdfsd4,4fr7f458')
      .map(res => res.json())
      .subscribe(res => console.log(res));
  }
}
