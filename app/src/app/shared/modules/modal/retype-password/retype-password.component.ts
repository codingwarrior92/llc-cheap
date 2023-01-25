import { Component, ViewChild, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';

// FORMS
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';

// SERVICES
import { ModalService, UserAPIService, AuthService, LocalStorage, HammerService } from '../../../services';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'retype-password',
	templateUrl: 'retype-password.component.html'
})

// CLASS
export class RetypePasswordComponent implements OnInit, OnDestroy {

	@ViewChild('retypepassword', { static: false }) retypePassword: any;

	// FORMGROUP
	form: FormGroup;

	// ARRAY
	message: Array<object> = [];

	// SUBSCRIPTIONS
	private _subscriptions: any = new Subscription();

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private fb: FormBuilder,
		private US: UserAPIService,
		private _localStorage: LocalStorage,
		public MS: ModalService,
		private hammerService: HammerService) { }

	ngOnInit() {
		this._form();
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	verifyPassword(form: NgForm) {
		let userId: number = this._localStorage.get('userId');

		if (this.form.valid && userId) {
			this.message = [];

			let password: any = this.form.get('password').value;
			let obj: any = {
				password
			};

			this._subscriptions.add(this.US.verifyUserPassword(userId, obj).subscribe((res) => {
				if (res.success) {
					let message: any = this.MS.processModalAlertInformation('verify-password', 'confirmed');
					this.MS.data$.next(message);
					form.reset();
				} else {
					this._message('danger', 'Incorrect password');
				}
			}, (error) => {
				this._message('danger', 'Error');
			}));
		}
	}

	close(a: AlertComponent) {
		this.message = this.message.filter((i) => i !== a);
	}

	private _form() {
		return this.form = this.fb.group({
			password: ['', [Validators.required, Validators.minLength(8)]],
		});
	}

	private _message(a: any, b: any, c: any = '', d: any = 0) {
		this.message.push({
			type: a,
			value: b,
			linkTitle: c,
			listId: d
		})
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
