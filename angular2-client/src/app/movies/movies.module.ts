import { CommentsComponent } from './components/comments/comments.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieDetailResolver } from './services/movie-detail-resolver.service';
import { SharedModule } from './../shared/shared.module';
import { MoviesRoutingModule } from './movies.routing';
import { NgModule } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';

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
