import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
  <toolbar></toolbar>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {

}
