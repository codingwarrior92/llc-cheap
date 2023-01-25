import { Component, ViewChild, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';

// FORMS
import { FormGroup, Validators, ValidationErrors, ValidatorFn, FormBuilder, AbstractControl } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// SERVICES
import { ModalService, AuthService, UserAPIService, LocalStorage } from '../../../services';

@Component({
	moduleId: module.id,
	selector: 'change-password',
	templateUrl: 'change-password.component.html'
})

// CLASS
export class ChangePasswordComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('changepassword', { static: false }) changePassword: any;

	// FORMGROUP
	form: FormGroup;

	// VALIDATERS
	lowercase: boolean;
	uppercase: boolean;
	number: boolean;
	special: boolean;
	eight: boolean;
	plus50: boolean;
	passwordRequirements: boolean;

	// ARRAY
	message: Array<object> = [];

	// SUBSCRIPTIONS
	subscriptions: any;

	// BOOLEAN
	loading = false;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private fb: FormBuilder,
		private US: UserAPIService,
		private LS: LocalStorage,
		private _authService: AuthService,
		public MS: ModalService) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this._form();
	}

	ngAfterViewInit() {
		this.MS.changePasswordModal = this.changePassword;
	}

	ngOnDestroy() {
		if (this.subscriptions) { this.subscriptions.unsubscribe(); }
	}

	private _form() {
		this.form = this.fb.group({
			'oldPassword': ['', [Validators.required, Validators.minLength(8)]],
			'newPassword': ['', [Validators.required, Validators.minLength(8), this._validatePattern]],
			'retypeNewPassword': ['', [Validators.required, Validators.minLength(8)]],
		});

		this.form.setValidators(this._validateRetypedPassword());

		return this.form;
	}

	updatePassword() {
		let userId: number = this.LS.get('userId');

		if (this.form.valid && userId) {
			this.message = [];

			this.loading = true;

			let oldPassword: any = this.form.get('oldPassword').value;
			let newPassword: any = this.form.get('newPassword').value;
			let passwordObject: object = {
				oldPassword,
				newPassword
			}

			this.subscriptions.add(this.US.updatePassword(userId, passwordObject)
				.subscribe((res) => {
					this.loading = false;

					if (res.success) {
						this.MS.close();
						this._authService.logout();
						let message: any = this.MS.processModalAlertInformation('credential-updated', 'Your changes have been updated, please relogin');
						this.MS.data$.next(message);
					}
				}, (error) => {
					this.loading = false;

					if (error && error.status === 400) {
						let message: string = error['error']['message'];
						this._message('danger', message);
					}
				}));
		}
	}

	private _validatePattern(c: AbstractControl) {
		let a = c.value;
		let l = a.match('[a-z]');
		let u = a.match('[A-Z]');
		let n = a.match('[0-9]');
		let s = a.match('[!@#$%^&*()]');

		return l && u && n && s ? null : { 'invalidNewPasswordPattern': true };
	}

	private _validateRetypedPassword(): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			const oldPassword = group.controls['oldPassword'].value;
			const newPassword = group.controls['newPassword'].value;
			const retypeNewPassword = group.controls['retypeNewPassword'].value;

			if (oldPassword && newPassword) {
				if (oldPassword === newPassword) {
					return {
						'oldPassword': true
					}
				}
			}

			if (newPassword && retypeNewPassword) {
				if (newPassword !== retypeNewPassword) {
					return {
						'invalidNewPassword': true
					}
				}
			}

			return null;
		};

	}

	_passwordChange(i) {
		let l = i.match('[a-z]');
		let u = i.match('[A-Z]');
		let n = i.match('[0-9]');
		let s = i.match('[!@#$%^&*()]');
		let e = i.length >= 8;
		let f = i.length === 50;

		if (l) {
			this.lowercase = true;
		} else {
			this.lowercase = false;
		}
		if (u) {
			this.uppercase = true;
		} else {
			this.uppercase = false;
		}
		if (n) {
			this.number = true;
		} else {
			this.number = false;
		}
		if (s) {
			this.special = true;
		} else {
			this.special = false;
		}
		if (e) {
			this.eight = true;
		} else {
			this.eight = false;
		}
		if (f) {
			this.plus50 = true;
		} else {
			this.plus50 = false;
		}

		this.passwordRequirements = l && u && n && s && e && !f ? true : false;
	}

	private _message(a: any, b: any, c: any = '', d: any = 0) {
		this.message.push({
			type: a,
			value: b,
			linkTitle: c,
			listId: d
		})
	}

	private _close(a: AlertComponent) {
		this.message = this.message.filter((i) => i !== a);
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
