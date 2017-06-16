import { Component } from '@angular/core';

@Component({
  styles: [`
    .home-wrap {
    }
  `],
  template: `
    <div fxLayout="row" fxLayoutAlign="center" class="home-wrap">
      <div fxFlex="30">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})

export class UserHomeComponent { }
