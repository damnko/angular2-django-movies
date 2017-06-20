import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
  <toolbar></toolbar>
  <error-bar></error-bar>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {

}
