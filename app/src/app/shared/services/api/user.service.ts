import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

// INTERFACES
import { IProfile } from '../../interfaces';

// ENV
import { environment } from '../../../../environments/environment';

// ROUTES
const api = `${environment.host}/api/`;

@Injectable()
export class UserAPIService implements OnDestroy {

  // SUBJECT
  profile$ = new BehaviorSubject(null);

  // OBJECT
  apiProfileInformation: IProfile;

  // SUBSCRIPTIONS
  subscriptions: any;

  constructor(private http: HttpClient) {
    this.subscriptions = new Subscription();

    this._fetchProfileInformation();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  // GETS
  getEmail(val: string) {
    return this.http.get(api + 'users/email/' + val).map((res: any) => res).catch(this._errorHandler);
  }

  getWatchlists(uid: number) {
    return this.http.get(`${api}users/${uid}/watchlist`).map((res: any) => res).catch(this._errorHandler);
  }

  getViewedProducts(uid: number, pageSize: number = 10) {
    return this.http.get(`${api}users/${uid}/viewed/${pageSize}`).map((res: any) => res).catch(this._errorHandler);
  }

  getSaved(uid: number) {
    return this.http.get(`${api}users/${uid}/saved`).map((res: any) => res).catch(this._errorHandler);
  }

  getSearched(uid: number) {
    return this.http.get(`${api}users/${uid}/history/search`).map((res: any) => res).catch(this._errorHandler);
  }

  getUser(uid: number) {
    return this.http.get(`${api}users/${uid}`).map((res: any) => res).catch(this._errorHandler);
  }

  getTwoFactorAuthentication(uid: number) {
    return this.http.get(`${api}users/${uid}/settings/security/two-factor`).map((res: any) => res).catch(this._errorHandler);
  }

  getUserPaymentMethods(userId: number) {
    return this.http.get(`${api}users/${userId}/settings/payment`).map((res: any) => res).catch(this._errorHandler);
  }

  // PUT

  updatePassword(uid: number, obj: any = {}) {
    return this.http.put(`${api}users/${uid}/settings/security/password`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  updateEmail(uid: number, obj: any = {}) {
    return this.http.put(`${api}users/${uid}/settings/security/email`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  updateProfile(uid: number, obj: any = {}) {
    return this.http.put(`${api}users/${uid}/settings/profile`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  updateTwoFactorAuthentication(uid: number, obj: any = {}) {
    return this.http.put(`${api}users/${uid}/settings/security/two-factor`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  editPaymentMethod(userId: number, paymentId: number, obj: any = {}) {
    return this.http.put(`${api}users/${userId}/settings/payment/${paymentId}`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  setPrimaryPaymentMethod(userId: number, paymentId: number, obj: any = {}) {
    return this.http.put(`${api}users/${userId}/settings/payment/primary/${paymentId}`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  // POST
  postSearched(uid: number, obj: any = {}) {
    return this.http.post(`${api}users/${uid}/history/search`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  postProductStatusViewed(obj: any = {}) {
    return this.http.post(`${api}users/postProductStatusViewed`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  postProduct(obj: any = {}) {
    return this.http.post(`${api}users/postProduct`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  postWatchlist(obj: any = {}) {
    return this.http.post(`${api}users/postWatchlist`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  verifyUserPassword(uid: number, obj: any = {}) {
    return this.http.post(`${api}users/${uid}/validatePassword`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  createStripeAccount(obj: any = {}) {
    return this.http.post(`${api}users/customer`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  createPaymentMethod(userId: number, obj: any = {}) {
    return this.http.post(`${api}users/${userId}/settings/payment/add`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  chargeCustomer(userId: number, obj: any = {}) {
    return this.http.post(`${api}users/${userId}/settings/payment/pay`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  createSubscription(obj: any = {}) {
    return this.http.post(`${api}users/subscription`, obj).map((res: any) => res).catch(this._errorHandler);
  }

  // DELETE
  deleteAllRecentlySearched(uid) {
    return this.http.delete(`${api}users/${uid}/history/search`).map((res: any) => res).catch(this._errorHandler);
  }

  deleteRecentlyViewedProduct(obj: any = {}) {
    return this.http.delete(`${api}users/${obj.uid}/viewed/${obj.productID}`).map((res: any) => res).catch(this._errorHandler);
  }

  deleteProduct(obj: any = {}) {
    return this.http.delete(`${api}users/${obj.uid}/deleteProduct/${obj.productID}`).map((res: any) => res).catch(this._errorHandler);
  }

  removeFromWatchList(obj: any = {}) {
    return this.http.delete(`${api}users/${obj.uid}/removeFromWatchList/${obj.productID}`).map((res: any) => res).catch(this._errorHandler);
  }

  removePaymentMethod(userId: number, paymentId: number) {
    return this.http.delete(`${api}users/${userId}/settings/payment/${paymentId}`).map((res: any) => res).catch(this._errorHandler);
  }

  cancelSubscription(obj: any = {}) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: obj
    };

    return this.http.delete(`${api}users/subscription`, options).map((res: any) => res).catch(this._errorHandler);
  }

  // SHARED DATA
  processProfileInformation(uid: number) {
    return this.http.get(`${api}users/${uid}/settings/profile`)
      .map(res => res)
      .do(
        (data: any) => {
          this.profile$.next(data);
        })
      .catch(this._errorHandler);
  }

  private _fetchProfileInformation() {
    this.subscriptions.add(this.profile$.subscribe((res: any) => {
      this.apiProfileInformation = res;
    }));
  }

  getUserProfile() {
    return this.apiProfileInformation ?
      of(this.apiProfileInformation) : this.profile$;
  }

  private _errorHandler(error: HttpErrorResponse) {
    if (!environment.production) {
      console.error(error);
    }
    return Observable.throw(error || 'Server Error');
  }
}
