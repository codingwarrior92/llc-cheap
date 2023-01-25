import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ROUTER
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs/Observable';

// AUTH
import { AuthService } from '../api/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(@Inject(PLATFORM_ID) private platform: any, private AS: AuthService, private R: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (isPlatformBrowser(this.platform)) {
      if (this.AS.isAuthenticated()) {
        return true;
      }

      this.R.navigate(['/login']);
      return false;
    }
  }
}
