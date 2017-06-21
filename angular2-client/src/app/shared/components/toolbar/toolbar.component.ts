import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../core/services';

@Component({
  selector: 'toolbar',
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html'
})

export class ToolbarComponent implements OnInit {

  constructor(
    public us: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // after each navigation event ends, check if auth token is not expired
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && !this.us.isAuth()) {
        this.us.logout();
      }
    });
  }

  logout(): void {
    this.us.logout();
    this.router.navigate(['/']);
  }

  goToEditProfile(): void {
    this.router.navigate(['/user/edit']);
  }
}
