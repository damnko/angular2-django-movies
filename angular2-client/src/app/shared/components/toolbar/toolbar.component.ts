import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  template: `
  <div fxLayout="row">
    <div fxFlex="100">
      <md-toolbar color="primary">
        <a routerLink="/">Angular2 Django | Movies</a>
        <span class="menu-space-filler"></span>
        <a href="#">
          <i class="fa fa-2x fa-github" aria-hidden="true"></i>
        </a>
      </md-toolbar>
    </div>
  </div>
  `
})

export class ToolbarComponent { }
