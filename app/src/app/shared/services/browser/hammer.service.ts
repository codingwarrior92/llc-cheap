import { Injectable } from '@angular/core';

// OBSERVABLE
import { Observable, Subject } from 'rxjs';

// HAMMER
import * as Hammer from 'hammerjs';

@Injectable({
  providedIn: 'root'
})
export class HammerService {
  htmlElement: HTMLElement;

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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipedown', (e) => {
          return status.next({
            swipe: 'down',
            status: true
          });
        });
        sd.on('swipeleft', (e) => {
          history.pushState(null, null, location.href);
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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeleft', (e) => {
          return status.next({
            swipe: 'left',
            status: true
          });
        });
        sd.on('swipeup', (e) => {
          return status.next({
            swipe: 'up',
            status: true
          });
        });
        sd.on('swipedown', (e) => {
          return status.next({
            swipe: 'down',
            status: true
          });
        });
        sd.on('swiperight', (e) => {
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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeup', (e) => {
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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipedown', (e) => {
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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swipeleft', (e) => {
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
      if (htmlElement) {
        const sd = new Hammer(htmlElement);
        sd.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        sd.on('swiperight', (e) => {
          return status.next({
            swipe: 'right',
            status: true
          });
        });
      }
    });
  }


}

