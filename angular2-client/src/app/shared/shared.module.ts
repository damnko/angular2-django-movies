import { ErrorBarComponent } from './components/errorbar/errorbar.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { GenresToTextPipe } from './pipes/genres-to-text.pipe';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdSnackBarModule,
  MdCardModule,
  MdListModule,
  MdInputModule,
  MdButtonModule,
  MdMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

const ANGULAR_MATERIAL_COMPONENTS = [
  MdCardModule,
  MdToolbarModule,
  MdSnackBarModule,
  MdListModule,
  MdInputModule,
  MdButtonModule,
  MdMenuModule
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ...ANGULAR_MATERIAL_COMPONENTS,
    FlexLayoutModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    ...ANGULAR_MATERIAL_COMPONENTS,
    ToolbarComponent,
    FlexLayoutModule,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    GenresToTextPipe,
    LoadingSpinnerComponent,
    NgxPaginationModule,
    ErrorBarComponent
  ],
  declarations: [
    ToolbarComponent,
    GenresToTextPipe,
    LoadingSpinnerComponent,
    ErrorBarComponent
  ],
  providers: [],
})
export class SharedModule { }
