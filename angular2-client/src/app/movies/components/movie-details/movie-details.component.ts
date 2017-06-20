import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IStarRatingOnClickEvent } from 'angular-star-rating/src/star-rating-struct';

import {
  HelpersService,
  MoviesService,
  UserService
} from './../../../core/services';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movie$: Observable<any>;
  movieInternalDetails: any;
  movieId: string;
  previousUserRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    public us: UserService,
    private ms: MoviesService,
    private helpers: HelpersService
  ) {}

  ngOnInit() {
    this.movie$ = this.route.data.map((res: any) => res.movie);
    this.route.params.first().subscribe(par => {
      const movieId = par['id'];
      this.getInternalDetails(movieId);
      this.movieId = movieId;
    });

    // check if user has already rated the movie
    this.ms.getMovieRating(this.movieId).first().subscribe(res => {
      this.previousUserRating = res.data.rating || 0;
    });
  }

  rateMovie(ev: IStarRatingOnClickEvent): void {
    this.ms.rateMovie(this.movieId, ev.rating)
      .subscribe(
        res => {
          this.previousUserRating = ev.rating;
          this.getInternalDetails(this.movieId);
        },
        err => this.helpers.showMessage(err.data.message)
      );
  }

  removeRating(): void {
    this.ms.removeRating(this.movieId)
      .subscribe(
        res => {
          this.previousUserRating = 0;
          this.getInternalDetails(this.movieId);
        },
        err => this.helpers.showMessage(err.data.message)
      );
  }

  private getInternalDetails(id: string): void {
    this.ms.getMovieInternalDetails(id)
      .map(res => res.data)
      .subscribe(res => this.movieInternalDetails = res);
  }
}
