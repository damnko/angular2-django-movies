import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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

export class ErrorBarComponent implements OnInit, OnDestroy {
  error: string;
  routerSub: Subscription;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(res => {
      // check, show and remove error after every navigation event ends
      if (res instanceof NavigationEnd) {
        this.error = localStorage.getItem('error');
        localStorage.removeItem('error');
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
