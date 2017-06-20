import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from './../../../core/services';

@Component({
  selector: 'toolbar',
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html'
})

export class ToolbarComponent {

  constructor(
    public us: UserService,
    private router: Router
  ) { }

  logout(): void {
    this.us.logout();
    this.router.navigate(['/']);
  }

  goToEditProfile(): void {
    this.router.navigate(['/user/edit']);
  }
}
