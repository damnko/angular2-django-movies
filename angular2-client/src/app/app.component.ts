import { Component, AfterViewInit, Renderer } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <toolbar></toolbar>
  <error-bar></error-bar>
  <router-outlet></router-outlet>
  `
})

export class AppComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer
  ) {}

  ngAfterViewInit() {
    // hide preloader
    const preloader: HTMLElement = document.getElementById('preloader');
    this.renderer.setElementClass(preloader, 'loaded', true);
  }
}
