
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';

// RXJS
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private _router: Router) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        let onLine = navigator.onLine;

        if (!onLine) {
          this._router.navigate(['/offline']);
        }

        if (event instanceof HttpResponse) {
          if (event.status === 524) {
            this._router.navigate(['/offline']);
          }
        }

        return event;
      }));
  }
}
