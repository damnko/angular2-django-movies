import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';

const ANGULAR_MATERIAL_COMPONENTS = [
  MdCardModule,
  MdToolbarModule
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
