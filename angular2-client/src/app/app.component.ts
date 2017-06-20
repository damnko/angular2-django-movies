import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <toolbar></toolbar>
  <error-bar></error-bar>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
}
