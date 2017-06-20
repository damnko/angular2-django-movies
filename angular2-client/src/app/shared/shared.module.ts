import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  MdToolbarModule,
  MdSnackBarModule,
  MdCardModule,
  MdListModule,
  MdInputModule,
  MdButtonModule,
  MdMenuModule
} from '@angular/material';

import {
  ErrorsToListPipe,
  GenresToTextPipe
} from './pipes';
import {
  ErrorBarComponent,
  LoadingSpinnerComponent,
  ToolbarComponent
} from './components';

const ANGULAR_MATERIAL_COMPONENTS = [
  MdCardModule,
  MdToolbarModule,
  MdSnackBarModule,
  MdListModule,
  MdInputModule,
  MdButtonModule,
  MdMenuModule
];

const COMPONENTS = [
  ErrorBarComponent,
  LoadingSpinnerComponent,
  ToolbarComponent
];

const PIPES = [
  ErrorsToListPipe,
  GenresToTextPipe
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
    FlexLayoutModule,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    NgxPaginationModule,
    ...COMPONENTS,
    ...PIPES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
})
export class SharedModule { }
