import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <toolbar></toolbar>
  <div fxLayout="row" fxLayoutAlign="space-around center">
    <div fxFlex="100">
      <h1>Angular2 Django Movies</h1>
    </div>
  </div>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {

}
