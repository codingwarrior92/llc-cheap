import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorage, SessionStorage } from '..';
import { Router } from '@angular/router';
import { of, Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Injectable()
export class AuthService implements OnDestroy {
  refreshSub: any;
  userProfile: any;
  refreshSubscription: any;
  private _subscriptions: any = new Subscription();
  renew: boolean | undefined;


  constructor(
    public afAuth: AngularFireAuth,
    private _localStorage: LocalStorage,
    private _sessionStorage: SessionStorage,
    private router: Router) {
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }


  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.handleUserAuthentication(user, 'email');
      return user;
    } catch (error) {
      console.log(error);
    }
  }


  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err: { error: any; }, authResult: { accessToken: any; idToken: any; }) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult);
  //     } else if (err) {
  //       this.router.navigate(['/login']);
  //       console.log(err);
  //       alert(`Error: ${err.error}. Check the console for further details.`);
  //     }
  //   });
  // }

  handleUserAuthentication(user: any, loginType: string): void {
    if (user && user.user_id && user.session_id && user.expires_at) {
      this.setSession(user);

      this._localStorage.set('login_type', loginType);
    } else {
      this.router.navigate(['/login']);
      alert(`Error: Check the console for further details.`);
    }
  }

  private setSession(authResult: { accessToken: any; idToken: any; expiresIn?: any; }, renew?: undefined): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    this._localStorage.set('access_token', authResult.accessToken);
    this._localStorage.set('id_token', authResult.idToken);
    this._localStorage.set('expires_at', expiresAt);

    if (renew) {
      this.scheduleRenewal();
    }

    const r = this._localStorage.get('authRedirect');
    const navArr = r === null ? '/user' : r;

    this.router.navigate([navArr]);
    this._clearRedirect();
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at')!);

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        // tslint:disable-next-line:no-shadowed-variable
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expiresAt - now));
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
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    return this._localStorage.remove('authRedirect');
  }

  private _clearOldNonces() {
    Object.keys(localStorage).forEach(key => {
      if (!key.startsWith('com.auth0.auth')) return;
      this._localStorage.remove(key);
    });
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  public renewToken() {
    this.afAuth.authState.subscribe((user: any) => {
      return this.setSession(user);
    });
  }


  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this._localStorage.remove('userId');
    this._localStorage.remove('session_id');
    this._localStorage.remove('expires_at');
    this._localStorage.remove('jwt_token');
    this._localStorage.remove('login_type');
    this._sessionStorage.remove('password_verification');

    this._clearOldNonces();
    this._clearRedirect();

    // Go back to the home route
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

}
