import { Injectable, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

// JWT
import * as jwt_decode from 'jwt-decode';

// RXJS
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

// ROUTER
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// HTTP
import { Http } from '@angular/http';

// SUBSCRIPTION
import { Subscription } from 'rxjs';

// SERVICES
import { LocalStorage } from '../local-storage/local-storage.service';
import { SessionStorage } from '../session-storage/session-storage.service';

// AUTH
import * as auth0 from 'auth0-js';

// ENVIRONMENT
const api = `${environment.host}/api/`;

@Injectable()
export class AuthService implements OnDestroy {
  refreshSub: any;
  userProfile: any;
  refreshSubscription: any;
  private _subscriptions: any = new Subscription();
  renew: boolean;
  url = this.document.location.origin;

  auth0 = new auth0.WebAuth({
    clientID: '96b0aXJKxvJRK4gYKR0YuJnEnXN8cJsE',
    domain: 'grceri-auth.auth0.com',
    audience: `https://grceri-auth.auth0.com/userinfo`,
    redirectUri: this.url + '/callback',
    responseType: 'token id_token',
    scope: 'openid profile user_metadata'
  });

  constructor(
    @Inject(PLATFORM_ID) private platform: any,
    @Inject(DOCUMENT) private document: Document,
    private LS: LocalStorage,
    private _sessionStorage: SessionStorage,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: Http) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  public login(obj: any = {}) {
    return this.http.post(`${api}users/login`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  loginCallback(obj: any = {}) {
    return this.http.post(`${api}users/callback`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  public signup(obj: any = {}) {
    return this.http.post(`${api}users/register`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  public checkSession(obj: any = {}) {
    return this.http.post(`${api}user/session`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  public resetPassword(email: string) {
    let a = new Promise((resolve, reject) => {
      this.auth0.changePassword({
        connection: 'mssql',
        email
      }, function (err, resp) {
        if (err) {
          reject(err.message);
        } else {
          resolve(resp);
        }
      });
    })

    return a;
  }

  processSocialLoginCallback(token: string, loginType: string) {
    let tokenObject: any = {
      jwt_token: token
    };

    this._subscriptions.add(this.loginCallback(tokenObject).subscribe((res) => {
      res = JSON.parse(res._body);
      res.jwt_token = token;

      if (res.success) {
        this.handleUserAuthentication(res, loginType);
      }
    }));
  }

  handleUserAuthentication(user: any, loginType: string): void {
    if (user && user.user_id && user.session_id && user.expires_at) {
      this.setSession(user);

      this.LS.set('login_type', loginType);
    } else {
      this.router.navigate(['/login']);
      alert(`Error: Check the console for further details.`);
    }
  }

  private setSession(user, renew?): void {
    // Set the time that the access token will expire at
    if (user.user_id) { this.LS.set('userId', user.user_id); }
    if (user.jwt_token) { this.LS.set('jwt_token', user.jwt_token); }
    if (user.session_id) { this.LS.set('session_id', user.session_id); }
    if (user.expires_at) { this.LS.set('expires_at', Date.parse(user.expires_at)); }

    if (renew) {
      this.scheduleRenewal();
    }

    if (isPlatformBrowser(this.platform)) {
      if (window.localStorage.getItem('authRedirect') === null) {
        (window as any).location.href = '/';
      } else {
        (window as any).location.href = window.localStorage.getItem('authRedirect');
      }
    }

    this._clearRedirect();
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    if (isPlatformBrowser(this.platform)) {
      const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
      const expiresIn$ = Observable.of(expiresAt).pipe(
        mergeMap(
          // tslint:disable-next-line:no-shadowed-variable
          expiresAt => {
            const now = Date.now();
            // Use timer to track delay until expiration
            // to run the refresh at the proper time
            return Observable.timer(Math.max(1, expiresAt - now));
          }
        )
      );

      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      this.refreshSub = expiresIn$.subscribe(
        () => {
          this.renewToken();
          this.scheduleRenewal();
        }
      );
    };
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    return this.LS.remove('authRedirect');
  }

  private _clearOldNonces() {
    if (isPlatformBrowser(this.platform)) {
      Object.keys(localStorage).forEach(key => {
        if (!key.startsWith('com.auth0.auth')) { return; }
        this.LS.remove(key);
      });
    }
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  public renewToken() {
    let jwt_token: string = this.LS.get('jwt_token');
    let token = { jwt_token };

    this._subscriptions.add(this.checkSession(token).subscribe((res) => {
      if (res && res._body) {
        let user = JSON.parse(res._body);

        if (user.success) {
          user.jwt_token = user.token;
          delete user.token;

          this.setSession(user);
        }
      }
    }));
  }


  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.LS.remove('userId');
    this.LS.remove('session_id');
    this.LS.remove('expires_at');
    this.LS.remove('jwt_token');
    this.LS.remove('login_type');
    this._sessionStorage.remove('password_verification');

    this._clearOldNonces();
    this._clearRedirect();

    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    if (isPlatformBrowser(this.platform)) {
      const expiresAt = localStorage.getItem('expires_at') ? JSON.parse(localStorage.getItem('expires_at')) : new Date().getTime();
      return new Date().getTime() < expiresAt;
    }
  }

  private _errorHandler(error: Response) {
    if (!environment.production) {
      console.error(error);
    }
    return throwError(error || 'Server Error');
  }
}
