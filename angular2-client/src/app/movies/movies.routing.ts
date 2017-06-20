import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailResolver } from './services/movie-detail-resolver.service';
import {
  MovieDetailsComponent,
  MovieListComponent
} from './components';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  {
    path: 'details/:id/:moviename',
    component: MovieDetailsComponent,
    resolve: { movie: MovieDetailResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule { }
