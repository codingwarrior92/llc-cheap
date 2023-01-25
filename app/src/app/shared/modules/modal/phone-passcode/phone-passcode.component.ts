import { Component, ViewChild, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';

// SERVICES
import { ModalService, DeviceService, ShoppingListAPIService, LocalStorage } from '../../../services';

// RXJS
import { Subscription } from 'rxjs';

// FORMS
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'phone-passcode',
	templateUrl: 'phone-passcode.component.html'
})

// CLASS
export class PhonePasscodeComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('phonepasscode', { static: false }) phonePasscode: any;

	subscriptions: any;

	// FORMGROUP
	form: FormGroup;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private fb: FormBuilder,
		private MS: ModalService
	) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this._form();
	}

	ngAfterViewInit() {
		this.MS.phonePasscodeModal = this.phonePasscode;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	private _form() {
		return this.form = this.fb.group({
			passcode: ['', [Validators.required]],
		});
	}

	private _isMobile() {
		if (isPlatformBrowser(this.platform)) {
			let mobile: boolean = (window.innerWidth < 767) ? true : false;

			if (mobile) {
				this.MS.close();
			}
		}
	}
}
