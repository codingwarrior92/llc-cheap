import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// ROUTER
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';


// AUTH
import { AuthService } from '../api/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(@Inject(PLATFORM_ID) private platform: any, private AS: AuthService, private R: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    let customRedirect = route.children;
    let isUserLoggedIn = this.AS.isAuthenticated();

    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platform)) {
        if (isUserLoggedIn) {
          console.log(customRedirect);
        }

        return resolve(isUserLoggedIn);
      }
    })

  }
}
