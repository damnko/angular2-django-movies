import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

export class MovieDetailsComponent implements OnInit {
  movie$: Observable<any>;
  movieInternalDetails$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((movie: any) => console.log('the movie is', movie));
    this.movie$ = this.route.data.map((res: any) => res.movie);
    this.route.params.first().subscribe(par => {
      this.getInternalDetails(par['id']);
    });
  }

  getInternalDetails(id: string): void {
    this.movieInternalDetails$ = this.ms.getMovieInternalDetails(id);
  }
}
