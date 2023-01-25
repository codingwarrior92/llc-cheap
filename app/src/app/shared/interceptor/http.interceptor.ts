import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

// SERVICES
import { HttpCancelService } from '../../services/http/http-cancel.service';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
  constructor(private httpCancelService: HttpCancelService) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()))
  }
}
