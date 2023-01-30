import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

export interface ILocalStorage {
	get(key: string, defaultValue: any): Observable<any>;
	set(key: string, value: any): void;
	remove(key: string): void;
}

@Injectable()
export class LocalStorage implements ILocalStorage {
	constructor(@Inject(PLATFORM_ID) private platform: any) { }
	protected subjects: { [key: string]: BehaviorSubject<any> } = {};

	get(key: string, defaultValue: any = null): any {

		if (this.subjects.hasOwnProperty(key)) {
			return this.subjects[key];
		}

		if (isPlatformBrowser(this.platform)) {
			if (!window.localStorage.getItem(key) && defaultValue) {
				window.localStorage.setItem(key, JSON.stringify(defaultValue));
			}
		}

		if (isPlatformBrowser(this.platform)) {
			const value = window.localStorage.getItem(key)
				? JSON.parse(window.localStorage.getItem(key)!)
				: defaultValue;

			return this.subjects[key] = new BehaviorSubject(value);
		}
	}

	set(key: string, value: any): void {
		if (isPlatformBrowser(this.platform)) {
			window.localStorage.setItem(key, JSON.stringify(value));

			if (this.subjects.hasOwnProperty(key)) {
				this.subjects[key].next(value);
			}
		}
	}

	remove(key: string): void {
		if (isPlatformBrowser(this.platform)) {
			window.localStorage.removeItem(key);

			if (this.subjects.hasOwnProperty(key)) {
				this.subjects[key].next(null);
			}
		}
	}
}