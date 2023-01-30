import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ISessionStorage {
  get(key: string, defaultValue: any): any;
  set(key: string, value: any): void;
  remove(key: string): void;
}

@Injectable()
export class SessionStorage implements ISessionStorage {
  constructor(@Inject(PLATFORM_ID) private platform: any) { }

  get(key: string, defaultValue: any = null): any {
    if (isPlatformBrowser(this.platform)) {
      const value = window.sessionStorage.getItem(key)
        ? JSON.parse(window.sessionStorage.getItem(key)!)
        : defaultValue;

      return value;
    }
  }

  set(key: string, value: any): void {
    if (isPlatformBrowser(this.platform)) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string): void {
    if (isPlatformBrowser(this.platform)) {
      window.sessionStorage.removeItem(key);
    }
  }
}
