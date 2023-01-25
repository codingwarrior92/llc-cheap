import { Component, ViewChild, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';

// FORMS
import { FormGroup, Validators, ValidationErrors, ValidatorFn, FormBuilder, AbstractControl } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';
import { withLatestFrom, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// SERVICES
import { ModalService, AuthService, UserAPIService, LocalStorage } from '../../../services';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'edit-email',
	templateUrl: 'edit-email.component.html'
})

// CLASS
export class EditEmailComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('editemail', { static: false }) editEmail: any;

	// FORMGROUP
	form: FormGroup;

	// BOOLEAN
	emailTaken: boolean;
	emailValid = false;
	loading = false;

	// SUBSCRIPTION
	subscriptions: any = new Subscription();

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private fb: FormBuilder,
		private _userAPI: UserAPIService,
		private _authService: AuthService,
		private _localStorage: LocalStorage,
		public MS: ModalService) { }

	ngOnInit() {
		this._form();
	}

	ngAfterViewInit() {
		this.MS.editEmailModal = this.editEmail;
		this._checkUserEmailTaken();
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	private _form() {
		this.form = this.fb.group({
			'oldEmail': ['', [Validators.email]],
			'newEmail': ['', [Validators.email, this._validateEmailNotTaken.bind(this)]],
			'emailValidHidden': [false, Validators.requiredTrue],
			'retypeNewEmail': ['', [Validators.required, Validators.minLength(8)]],
		});

		this.form.setValidators(this._validateRetypedEmail());
	}

	private _validateEmailNotTaken(control: AbstractControl) {
		return { emailTaken: false };
	}

	private _validateRetypedEmail(): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			const oldEmail = group.controls['oldEmail'].value;
			const newEmail = group.controls['newEmail'].value;
			const retypeNewEmail = group.controls['retypeNewEmail'].value;

			if (oldEmail && newEmail) {
				if (oldEmail === newEmail) {
					return {
						'oldEmail': true
					}
				}
			}

			if (newEmail && retypeNewEmail) {
				if (newEmail !== retypeNewEmail) {
					return {
						'invalidNewEmail': true
					}
				}
			}

			return null;
		};
	}

	private _validateEmail(value: any) {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isEmail: boolean = re.test(String(value).toLowerCase());

		if (!isEmail) {
			return {
				invalidEmail: true
			}
		}

		return null;
	}

	private _checkUserEmailTaken() {
		this.form.controls['newEmail'].valueChanges.pipe(distinctUntilChanged(), debounceTime(800), withLatestFrom()).subscribe(res => {
			let value = res[0];
			let emailValidated = this._validateEmail(value);

			if (emailValidated && emailValidated.invalidEmail) {
				return false;
			}

			this._userAPI
				.getEmail(value)
				.pipe(withLatestFrom())
				.subscribe((res: any) => {
					this.emailTaken = res[0].user;
					this._enableDisableEmailError();
				});
		});
	}

	private _enableDisableEmailError() {
		let emailControl: AbstractControl;
		let emailValidatorControl: AbstractControl;

		emailControl = this.form.controls['newEmail'];
		emailValidatorControl = this.form.controls['emailValidHidden'];

		if (this.emailTaken) {
			emailControl.setErrors({ emailTaken: 'Oh noes, this email is already taken! Try another one.' });
		} else {
			this.emailValid = true;

			emailControl.setErrors(null);
		}

		emailValidatorControl.setValue(!this.emailTaken);
	}

	editUserEmail() {
		let userId: number = this._localStorage.get('userId');

		if (this.form.valid && userId) {
			this.loading = true;

			let newEmail: any = this.form.get('newEmail').value;
			let oldEmail: any = this.form.get('oldEmail').value;

			let obj: any = {
				newEmail,
				oldEmail,
				isVerified: true
			};

			this.subscriptions.add(this._userAPI.updateEmail(userId, obj).subscribe((res) => {
				this.loading = false;

				if (res.success) {
					this.MS.close();
					this._authService.logout();
					let message: any = this.MS.processModalAlertInformation('credential-updated', 'Your changes have been updated, please relogin');
					this.MS.data$.next(message);
				}
			}, (error) => {
				this.loading = false;
			}));
		}
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
