import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MoviesService } from './../../../core/services';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  public topMovies$: Observable<any>;
  public moviesSinceDate: Date | any;
  public spinnerStyles: any;

  constructor(
    private movies: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.topMovies$ = this.movies.getTopMovies();
    this.moviesSinceDate = this.movies.moviesFromDate();

    // custom styles to fit loader to card container
    this.spinnerStyles = {
      margin: '-24px -24px 16px -24px'
    };
  }

  getMovieDetails(movie: any): void {
    movie.detailsLoading = true;
    const title = encodeURIComponent(movie.original_title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate([`/details/${movie.id}/${title}`]);
  }
}
