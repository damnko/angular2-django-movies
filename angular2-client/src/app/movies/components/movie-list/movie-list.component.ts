import { UserService } from './../../../core/services/user.service';
import { Http } from '@angular/http';
import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {
  public topMovies$: Observable<any>;
  public moviesSinceDate: Date | any;
  public spinnerStyles: any;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private movies: MoviesService,
    private http: Http,
    private router: Router,
    private us: UserService
  ) { }

  ngOnInit() {
    this.topMovies$ = this.movies.getTopMovies();
    this.moviesSinceDate = this.movies.moviesFromDate();

    // custom styles to fit loader to card container
    this.spinnerStyles = {
      margin: '-24px -24px 16px -24px'
    };

    console.log('is user auth?', tokenNotExpired());
  }

  testapi(): void {
    console.log('is auth?', this.us.isAuth());
    console.log('details?', this.us.getAuthDetails());
  }

  getMovieDetails(movie: any): void {
    movie.detailsLoading = true;
    const title = encodeURIComponent(movie.original_title.toLowerCase().replace(/ /g, '-'));
    this.router.navigate([`/details/${movie.id}/${title}`]);
  }
}
