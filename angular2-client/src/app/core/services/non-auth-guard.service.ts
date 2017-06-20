import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class NonAuthGuard implements CanActivateChild {
  constructor(
    private us: UserService,
    private router: Router
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.us.isAuth()) {
      localStorage.setItem('error', 'You need to logout to access this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
