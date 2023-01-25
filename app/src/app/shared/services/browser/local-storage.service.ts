import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ILocalStorage {
  get(key: string, defaultValue: any): any;
  set(key: string, value: any): void;
  remove(key: string): void;
}

@Injectable()
export class LocalStorage implements ILocalStorage {
  constructor(@Inject(PLATFORM_ID) private platform: any) { }

  get(key: string, defaultValue: any = null): any {
    if (isPlatformBrowser(this.platform)) {
      const value = window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : defaultValue;

      return value;
    }
  }

  set(key: string, value: any): void {
    if (isPlatformBrowser(this.platform)) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string): void {
    if (isPlatformBrowser(this.platform)) {
      window.localStorage.removeItem(key);
    }
  }
}
