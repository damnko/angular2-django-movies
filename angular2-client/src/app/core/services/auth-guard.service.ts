import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private us: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.us.isAuth()) {
      localStorage.setItem('error', 'You need to be logged in to access this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
