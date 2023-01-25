import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef, Output, HostListener, PLATFORM_ID, Inject, AfterViewInit, ViewEncapsulation, EventEmitter, ElementRef } from '@angular/core';

// FORMS
import { FormGroup, FormBuilder } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser, Location } from '@angular/common';

// SERVICES
import { ModalService, LocalStorage, UserAPIService, PaymentAPIService, HammerService } from '../../../services';

// INTERFACES
import { IProfile } from '../../../interfaces';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
	moduleId: module.id,
	selector: 'add-payment-method',
	templateUrl: 'add-payment-method.component.html',
	styleUrls: ['add-payment-method.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class AddPaymentMethodComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('addpaymentmethod', { static: false }) addPaymentMethod: any;
	@ViewChild('content', { static: false }) content: ElementRef;

	@Output() refresh: EventEmitter<any[]> = new EventEmitter();

	// OBJECT
	message = [];

	// BOOLEAN
	cardValidated = false;
	loading = false;
	creditCard: any;

	// INTERFACES
	profile: IProfile;

	// FORMGROUP
	addCard: FormGroup;

	// LOADER
	state = this.LB;

	// SUBSRIPTIONS
	private _subscriptions: any = new Subscription();

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private _formBuilder: FormBuilder,
		private _changeDetector: ChangeDetectorRef,
		private _userService: UserAPIService,
		public paymentService: PaymentAPIService,
		private _localStorage: LocalStorage,
		private LB: LoadingBarService,
		public MS: ModalService,
		private hammerService: HammerService,
		private location: Location) { }

	ngOnInit() {
		this._form();
		this._getUserInformation();
	}

	ngAfterViewInit() {
		this._changeDetector.detectChanges();
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	private _form() {
		this.addCard = this._formBuilder.group({
			addressLine1: [''],
			addressLine2: [''],
			city: [''],
			state: [''],
			zip: ['']
		});
	}

	private _getUserInformation() {
		let userInformation$: any = this._userService.getUserProfile();
		this._subscriptions.add(userInformation$.subscribe((res: IProfile) => {
			if (res) {
				this.profile = res;

				this._preFillForm();

				this._checkUserInformationFields();
			}
		}));
	}

	private _checkUserInformationFields() {
		this.paymentService.addressLine1 = this.profile['addressLine1'] ? true : false;
		this.paymentService.addressLine2 = this.profile['addressLine2'] ? true : false;
		this.paymentService.city = this.profile['city'] ? true : false;
		this.paymentService.state = this.profile['state'] ? true : false;
		this.paymentService.zip = this.profile['zip'] ? true : false;
	}

	private _preFillForm() {
		if (this.profile.addressLine1) {
			this.addCard.get('addressLine1').setValue(this.profile.addressLine1);
		}

		if (this.profile.addressLine2) {
			this.addCard.get('addressLine2').setValue(this.profile.addressLine2);
		}

		if (this.profile.city) {
			this.addCard.get('city').setValue(this.profile.city);
		}

		if (this.profile.state) {
			this.addCard.get('state').setValue(this.profile.state);
		}

		if (this.profile.zip) {
			this.addCard.get('zip').setValue(this.profile.zip);
		}
	}

	getCreditCardValidationInformation(data) {
		this.cardValidated = data;
		this._changeDetector.detectChanges();
	}

	setPaymentMethod(creditCard: any) {
		this.creditCard = creditCard;
		this.loading = true;

		this._checkPaymentMethod();
	}

	private _checkPaymentMethod() {
		let paymentMethods$ = this.paymentService.getPayments();

		// START LOADER
		this.state.start();

		this._subscriptions.add(paymentMethods$.subscribe((res) => {
			if (res) {
				let paymentMethods = res.paymentMethods;

				if (paymentMethods) {
					if (paymentMethods.length > 0) {
						this._createPaymentMethod();
					} else {
						this._createInitialPaymentMethod();
					}
				}
			}
		}))
	}

	private _createInitialPaymentMethod() {
		let tokenPromise = this.creditCard.createCardToken();

		tokenPromise.then((res: any) => {
			if (res.token) {

				let token: string = res.token['id'];
				let userId: number = this._localStorage.get('userId');

				let obj = {
					userId,
					token
				};

				this._subscriptions.add(this._userService.createStripeAccount(obj).subscribe(res => {
					this.loading = false;
					this.state.complete();
					this.state.stop();

					if (res) {
						this._updateUserProfile();
						this.paymentService.payments$.next(res);
						this.refresh.emit(res);
						this._syncModalInformation('card-added', 'Card has been added successfully');
						this.cardValidated = false;
						this.MS.close();
					}
				}, (error) => {
					// LOADER
					this.loading = false;
					this.state.complete();
					this.state.stop();

					if (error.status === 400) {
						this.cardValidated = false;

						this._syncModalInformation('card-added-error', 'Card already has beed added.');
					}
				}));
			}
		});
	}

	private _processProfileCardInformation(): any {
		let additionalInfo: any = {};

		if (this.addCard.get('addressLine1').value) {
			additionalInfo['address_line1'] = this.addCard.get('addressLine1').value;
		}
		if (this.addCard.get('addressLine2').value) {
			additionalInfo['address_line2'] = this.addCard.get('addressLine2').value;
		}
		if (this.addCard.get('city').value) {
			additionalInfo['address_city'] = this.addCard.get('city').value;
		}
		if (this.addCard.get('state').value) {
			additionalInfo['address_state'] = this.addCard.get('state').value;
		}
		if (this.addCard.get('zip').value) {
			additionalInfo['address_zip'] = this.addCard.get('zip').value;
		}

		return additionalInfo;
	}

	private _createPaymentMethod() {
		let additionalInfo: any = this._processProfileCardInformation();

		let tokenPromise = this.creditCard.createCardToken(additionalInfo);

		tokenPromise.then((res: any) => {
			if (res.token) {
				let token: string = res.token['id'];
				let userId: number = this._localStorage.get('userId');

				let obj = {
					token
				};

				this._subscriptions.add(this._userService.createPaymentMethod(userId, obj).subscribe(res => {
					this.loading = false;
					this.state.complete();
					this.state.stop();

					if (res) {
						this._updateUserProfile();
						this.paymentService.payments$.next(res);
						this.refresh.emit(res);
						this.MS.close();
						this._syncModalInformation('card-added', 'Card has been added successfully');
						this.cardValidated = false;
					}
				}, (error) => {
					// LOADER
					this.loading = false;
					this.state.complete();
					this.state.stop();

					if (error.status === 400) {
						this.cardValidated = false;

						this._syncModalInformation('card-added-error', 'Card already has beed added.');
					}
				}));
			}
		});
	}

	private _updateUserProfile() {
		let userId: number = this._localStorage.get('userId');
		let profileUpdated = false;

		if (!this.profile['addressLine1'] && this.addCard.get('addressLine1').value) {
			this.profile['addressLine1'] = this.addCard.get('addressLine1').value;
			profileUpdated = true;
		}

		if (!this.profile['addressLine2'] && this.addCard.get('addressLine2').value) {
			this.profile['addressLine2'] = this.addCard.get('addressLine2').value;
			profileUpdated = true;
		}

		if (!this.profile['state'] && this.addCard.get('state').value) {
			this.profile['state'] = this.addCard.get('state').value;
			profileUpdated = true;
		}

		if (!this.profile['zip'] && this.addCard.get('zip').value) {
			this.profile['zip'] = this.addCard.get('zip').value;
			profileUpdated = true;
		}

		if (!this.profile['city'] && this.addCard.get('city').value) {
			this.profile['city'] = this.addCard.get('city').value;
			profileUpdated = true;
		}

		if (profileUpdated) {
			this._subscriptions.add(this._userService.updateProfile(userId, this.profile).subscribe((res) => {
				if (res.success) {
					this._userService.profile$.next(this.profile);

					this._checkUserInformationFields();
				}
			}));
		}
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

	checkBothUserFieldsEmpty(field1: boolean, field2: boolean): boolean {
		if (!field1 || !field2) { return true; }

		return false;
	}
}
