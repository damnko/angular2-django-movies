import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdSnackBarModule, MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';

const ANGULAR_MATERIAL_COMPONENTS = [
  MdCardModule,
  MdToolbarModule,
  MdSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    ...ANGULAR_MATERIAL_COMPONENTS,
    FlexLayoutModule,
    StarRatingModule
  ],
  exports: [
    CommonModule,
    ...ANGULAR_MATERIAL_COMPONENTS,
    ToolbarComponent,
    FlexLayoutModule,
    StarRatingModule
  ],
  declarations: [
    ToolbarComponent
  ],
  providers: [],
})
export class SharedModule { }
