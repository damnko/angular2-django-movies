import { Component } from '@angular/core';

@Component({
  styleUrls: ['./user-home.component.scss'],
  template: `
    <div fxLayout="row" fxLayoutAlign="center" class="home-wrap">
      <div fxFlex="90" fxFlex.gt-sm="40" fxFlex.gt-md="30">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})

export class UserHomeComponent { }
