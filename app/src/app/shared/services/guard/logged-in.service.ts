import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ROUTER
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// RXJS

// AUTH
import { AuthService } from '../api/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInService implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    private AS: AuthService,
    public R: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {

      if (!this.AS.isAuthenticated()) {
        return resolve(true);
      }

      if (isPlatformBrowser(this.platform)) {
        window.location.href = '/';
        return reject(false);
      }

      return reject(false);
    })
  }
}
