import { IProfile } from './../../../interfaces/profile/profile.interface';
import { Component, ViewChild, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef, Input, ElementRef, HostListener, PLATFORM_ID, Inject, AfterViewInit, Output, EventEmitter } from '@angular/core';

// FORMS
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// SERVICES
import { ModalService, LocalStorage, PaymentAPIService, UserAPIService, CommonService, ProductAPIService, ProfileAPIService } from '../../../services';

// INTERFACES
import { PaymentMethod } from '../../../interfaces';

@Component({
	moduleId: module.id,
	selector: 'edit-payment-method',
	templateUrl: 'edit-payment-method.component.html'
})

// CLASS
export class EditPaymentMethodComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	@ViewChild('editpaymentmethod', { static: false }) editPaymentMethod: any;
	@Input() paymentMethod: PaymentMethod;
	@Output() editRefresh: EventEmitter<any[]> = new EventEmitter();

	// paymentMethod: PaymentMethod;
	billing: PaymentMethod[];

	// FORMGROUP
	form: FormGroup;

	// ARRAY
	message: Array<object> = [];
	countries: Array<object>;
	months: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	years: Array<number> = [];

	private _subscriptions: any = new Subscription();
	// creditCard: any;

	// BOOLEAN
	cardValidated = false;
	formChanges = false;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private fb: FormBuilder,
		private _changeDetector: ChangeDetectorRef,
		private _userAPI: UserAPIService,
		private _commonService: CommonService,
		private _localStorage: LocalStorage,
		private _paymentService: PaymentAPIService,
		public MS: ModalService) { }

	ngOnChanges(changes: SimpleChanges) {
		if (this.paymentMethod) {
			this._setFormData();
		}
	}

	ngOnInit() {
		this._form();
		this._getCountries();
		this._getYears();
	}

	ngAfterViewInit() {
		this.MS.editPaymentMethodModal = this.editPaymentMethod;
		this._changeDetector.detectChanges();
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	private _getYears() {
		let date = new Date().getFullYear();
		let length = date + 16;

		for (let i = date; i < length; i++) {
			this.years.push(i);
		}
	}

	private _setFormData() {
		let name = this.paymentMethod['cardholderName'].trim();

		let firstName = name.substring(0, name.lastIndexOf(' ') + 1);
		let lastName = name.substring(name.lastIndexOf(' ') + 1, name.length);
		this.form.get('cardInfo').setValue(this.paymentMethod.cardBrand + ' ending with ' + this.paymentMethod.lastFourDigits);
		this.form.get('firstName').setValue(firstName);
		this.form.get('lastName').setValue(lastName);
		this.form.get('lastFourDigits').setValue(this.paymentMethod.lastFourDigits);
		this.form.get('expiryMonth').setValue(this.paymentMethod.expiryMonth);
		this.form.get('expiryYear').setValue(this.paymentMethod.expiryYear);
		this.form.get('country').setValue(this.paymentMethod.country);
		this.form.get('addressLine1').setValue(this.paymentMethod.addressLine1);
		this.form.get('addressLine2').setValue(this.paymentMethod.addressLine2);
		this.form.get('state').setValue(this.paymentMethod.state);
		this.form.get('city').setValue(this.paymentMethod.city);
		this.form.get('zip').setValue(this.paymentMethod.zip);
	}

	private _getCountries() {
		this._subscriptions.add(this._commonService.getContryList().subscribe((res) => {
			if (res) {
				this.countries = res;
			}
		}));
	}

	private _form() {
		this.form = this.fb.group({
			cardInfo: [''],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			lastFourDigits: ['', Validators.required],
			addressLine1: [''],
			addressLine2: [''],
			expiryMonth: [''],
			expiryYear: [''],
			country: [''],
			city: [''],
			state: [''],
			zip: ['']
		});
	}

	updatePaymentMethod() {
		let userId: number = this._localStorage.get('userId');
		let paymentId: number = this.paymentMethod['paymentId'];
		let obj: any = {
			cardHolderName: this.form.get('firstName').value + ' ' + this.form.get('lastName').value,
			expiryMonth: this.form.get('expiryMonth').value,
			expiryYear: this.form.get('expiryYear').value,
			country: this.form.get('country').value,
			city: this.form.get('city').value,
			state: this.form.get('state').value,
			zip: this.form.get('zip').value,
			addressLine1: this.form.get('addressLine1').value,
			addressLine2: this.form.get('addressLine2').value
		}

		this._subscriptions.add(this._userAPI.editPaymentMethod(userId, paymentId, obj).subscribe(res => {
			if (res) {
				this._getAndUpdateUserInformation();
				this._paymentService.payments$.next(res);
				this.editRefresh.emit(res);
				this._syncModalInformation('card-added', 'Card has been updated successfully');
				this.MS.close();
			}
		}, (error) => {
			this._message('danger', 'Something went wrong');
		}));
	}

	private _getAndUpdateUserInformation() {
		let userInformation$: any = this._userAPI.getUserProfile();
		this._subscriptions.add(userInformation$.subscribe((res: IProfile) => {
			if (res) {
				this._updateUserProfile(res);
			}
		}));
	}

	private _updateUserProfile(profile: IProfile) {
		let userId: number = this._localStorage.get('userId');
		let profileUpdated = false;

		if (!profile['addressLine1'] && this.form.get('addressLine1').value) {
			profile['addressLine1'] = this.form.get('addressLine1').value;
			profileUpdated = true;
		}

		if (!profile['addressLine2'] && this.form.get('addressLine2').value) {
			profile['addressLine2'] = this.form.get('addressLine2').value;
			profileUpdated = true;
		}

		if (!profile['state'] && this.form.get('state').value) {
			profile['state'] = this.form.get('state').value;
			profileUpdated = true;
		}

		if (!profile['zip'] && this.form.get('zip').value) {
			profile['zip'] = this.form.get('zip').value;
			profileUpdated = true;
		}

		if (!profile['city'] && this.form.get('city').value) {
			profile['city'] = this.form.get('city').value;
			profileUpdated = true;
		}

		if (profileUpdated) {
			this._subscriptions.add(this._userAPI.updateProfile(userId, profile).subscribe((res) => {
				if (res.success) {
					this._userAPI.profile$.next(profile);

					this._checkUserInformationFields(profile);
				}
			}));
		}
	}

	private _checkUserInformationFields(profile: IProfile) {
		this._paymentService.addressLine1 = profile['addressLine1'] ? true : false;
		this._paymentService.addressLine2 = profile['addressLine2'] ? true : false;
		this._paymentService.city = profile['city'] ? true : false;
		this._paymentService.state = profile['state'] ? true : false;
		this._paymentService.zip = profile['zip'] ? true : false;
	}

	private _syncModalInformation(type: string, info: string = 'confirmed') {
		let message: any = this.MS.processModalAlertInformation(type, info);
		this.MS.data$.next(message);
	}

	private _isMobile() {
		if (isPlatformBrowser(this.platform)) {
			let mobile: boolean = (window.innerWidth < 767) ? true : false;

			if (mobile) {
				this.MS.close();
			}
		}
	}

	private _message(a: any, b: any, c: any = '', d: number = 0) {
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
}
