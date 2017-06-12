import { Http } from '@angular/http';
import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-list',
  templateUrl: 'movie-list.component.html'
})

export class MovieListComponent implements OnInit {
  public topMovies$: Observable<any>;
  public error: string;

  constructor(
    private movies: MoviesService,
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    this.topMovies$ = this.movies.getTopMovies();
    this.checkForErrors();
  }

  testapi(): void {
    this.http.get('/api/movies/get-all?ids=15sdfsd4,4fr7f458')
      .map(res => res.json())
      .subscribe(res => console.log(res));
  }

  getMovieDetails(movie: any): void {
    movie.detailsLoading = true;
    const title = encodeURIComponent(movie.original_title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate([`/details/${movie.id}/${title}`]);
  }

  private checkForErrors(): void {
    this.error = localStorage.getItem('error');
    localStorage.removeItem('error');
  }
}
