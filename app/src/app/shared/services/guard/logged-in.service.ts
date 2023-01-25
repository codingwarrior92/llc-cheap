import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ROUTER
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs/Observable';

// AUTH
import { AuthService } from '../api/auth.service';

@Injectable()
export class LoggedInService implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    private AS: AuthService,
    public R: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.AS.isAuthenticated()) {
      return true;
    }

    if (isPlatformBrowser(this.platform)) {
      window.location.href = '/';
      return false;
    }
  }
}
