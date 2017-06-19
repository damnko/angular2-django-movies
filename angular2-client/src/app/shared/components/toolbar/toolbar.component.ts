import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'toolbar',
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
