import { SharedModule } from './../shared/shared.module';
import { MovieListRoutingModule } from './movie-list.routing';
import { NgModule } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@NgModule({
  imports: [
    SharedModule
    MovieListRoutingModule
  ],
  declarations: [
    MovieListComponent
  ],
})
export class MovieListModule { }
