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

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | any {
    let customRedirect = route.routeConfig?.data;
    let isUserLoggedIn = this.AS.isAuthenticated();

    if (isUserLoggedIn) {
      if (customRedirect) {
        this.R.navigate(['/account/order/' + customRedirect['type'] + "/" + customRedirect['order']]);
        return isUserLoggedIn;
      }
    }
    return true;
  }
}
