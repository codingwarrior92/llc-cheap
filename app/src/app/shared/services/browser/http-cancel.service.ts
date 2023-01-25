import { Injectable } from '@angular/core';

// SUBJECT
import { Subject } from 'rxjs';

@Injectable()
export class HttpCancelService {
  private cancelPendingRequests$ = new Subject<void>();

  constructor() { }

  public cancelPendingRequests() {
    this.cancelPendingRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.cancelPendingRequests$.asObservable();
  }

}
