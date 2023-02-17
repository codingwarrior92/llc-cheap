import { Injectable } from '@angular/core';

// OBSERVABLE
import { Observable, Subject } from 'rxjs';

// HAMMER
if (typeof window !== undefined) {
  import(/* webpackChunkName: "hammerjs" */ 'hammerjs').then(Hammer => {
    // Use Hammer.js here
  });
}


@Injectable({
  providedIn: 'root'
})
export class HammerService {
  htmlElement: HTMLElement | undefined;

  // RXJS
  status = new Subject;

  // BOOLEAN
  s = false;

  // STRING
  url = '';

  constructor() {
  }

  SwipeLeftDownClose(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipedown', () => {
          return status.next({
            swipe: 'down',
            status: true
          });
        });
        sd.on('swipeleft', () => {
          history.pushState(null, location.href);
          return status.next({
            swipe: 'left',
            status: true
          });
        });
      }
    });
  }

  Swipe(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeleft', () => {
          return status.next({
            swipe: 'left',
            status: true
          });
        });
        sd.on('swipeup', () => {
          return status.next({
            swipe: 'up',
            status: true
          });
        });
        sd.on('swipedown', () => {
          return status.next({
            swipe: 'down',
            status: true
          });
        });
        sd.on('swiperight', () => {
          return status.next({
            swipe: 'right',
            status: true
          });
        });
      }
    });
  }


  SwipeUp(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeup', () => {
          return status.next({
            swipe: 'up',
            status: true
          });
        });
      }
    });
  }

  SwipeDown(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipedown', () => {
          return status.next({
            swipe: 'down',
            status: true
          });
        });
      }
    });
  }

  SwipeLeft(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeleft', () => {
          return status.next({
            swipe: 'left',
            status: true
          });
        });
      }
    });
  }

  SwipeRight(htmlElement: HTMLElement): Observable<any> {
    return new Observable((status) => {
      if (htmlElement && typeof window !== 'undefined') {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swiperight', () => {
          return status.next({
            swipe: 'right',
            status: true
          });
        });
      }
    });
  }


}

