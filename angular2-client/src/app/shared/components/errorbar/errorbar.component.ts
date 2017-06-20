import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'error-bar',
  styleUrls: ['./errorbar.component.scss'],
  template: `
    <div fxLayout="row" fxLayoutAlign="center" *ngIf="error">
      <div fxFlex="80" class="error-bar alert error">
        {{ error }}
      </div>
    </div>
  `
})

export class ErrorBarComponent implements OnInit {
  error: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.error = localStorage.getItem('error');
        localStorage.removeItem('error');
      }
      console.log('router event triggered', res);
    });
  }
}
