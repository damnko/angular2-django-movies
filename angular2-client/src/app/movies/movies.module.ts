import { NgModule } from '@angular/core';

import { MovieDetailResolver } from './services/movie-detail-resolver.service';
import { SharedModule } from './../shared/shared.module';
import { MoviesRoutingModule } from './movies.routing';
import {
  CommentsComponent,
  MovieDetailsComponent,
  MovieListComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    MoviesRoutingModule
  ],
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    CommentsComponent
  ],
  providers: [
    MovieDetailResolver
  ]
})
export class MoviesModule { }
