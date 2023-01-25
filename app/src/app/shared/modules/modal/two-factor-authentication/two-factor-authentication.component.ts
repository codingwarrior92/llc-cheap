import { Component, ViewChild, OnInit, ChangeDetectorRef, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';

// FORMS
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, FormBuilder, AbstractControl } from '@angular/forms';

// SERVICES
import { ModalService, LocalStorage, UserAPIService } from '../../../services';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'two-factor-authentication',
	templateUrl: 'two-factor-authentication.component.html'
})

// CLASS
export class TwoFactorAuthenticationComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('twofactorauthentication', { static: false }) twoFactorAuthentication: any;

	_subscriptions: any;

	form: FormGroup;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private _formBuilder: FormBuilder,
		private _userAPI: UserAPIService,
		private _localStorage: LocalStorage,
		private _changeDetector: ChangeDetectorRef,
		public MS: ModalService) {
		this._subscriptions = new Subscription();
	}

	ngOnInit() {
		this._form();
		this._getTwoFactorAuthenticationSettings();
	}

	ngAfterViewInit() {
		this.MS.twoFactorAuthenticationModal = this.twoFactorAuthentication;
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	private _form() {
		this.form = this._formBuilder.group({
			'enabled': this._formBuilder.control(0)
		});
	}

	private _getTwoFactorAuthenticationSettings() {
		let userId: number = this._localStorage.get('userId');

		this._subscriptions.add(this._userAPI.getTwoFactorAuthentication(userId).subscribe((res) => {
			if (res) {
				this.form.get('enabled').setValue(res.enabled);
				this._changeDetector.detectChanges();
			}
		}));
	}

	applyTwoFactorAuthentication() {
		let enabled: boolean = this.form.get('enabled').value;
		let userId: number = this._localStorage.get('userId');

		let obj = {
			enabled
		}

		this._subscriptions.add(this._userAPI.updateTwoFactorAuthentication(userId, obj).subscribe((res) => {
			if (res.success) {
				this._getTwoFactorAuthenticationSettings();
				this.MS.close();
			}
		}));
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
