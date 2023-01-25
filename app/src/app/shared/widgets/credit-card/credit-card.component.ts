import {
	Component, OnInit, OnChanges, OnDestroy, AfterViewInit,
	ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';

import {
	FormGroup, Validators, FormBuilder, ValidatorFn, ValidationErrors
} from '@angular/forms';

// SERVICES
import { GoogleAnalyticsService } from '../../services';

// INTERFACES
import { IProfile } from '../../interfaces';

// ENV
import { environment } from '../../../../environments/environment';

// Before the component
declare var Stripe: any;

@Component({
	selector: 'credit-card',
	templateUrl: 'credit-card.component.html',
	styleUrls: ['credit-card.component.scss']
})

export class CreditCardComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	// SIGN UP
	@Input('email') email: string;
	@Input('password') password: string;
	@Input() profile: IProfile;
	@Output() creditCardValidate = new EventEmitter<any>();

	// STRIPE
	@ViewChild('form', { static: false }) Form: ElementRef
	@ViewChild('cardInfo', { static: false }) cardInfo: ElementRef
	@ViewChild('cardNumberElement', { static: false }) cardNumberElement: ElementRef
	@ViewChild('cardExpiryElement', { static: false }) cardExpiryElement: ElementRef
	@ViewChild('cardCVCElement', { static: false }) cardCVCElement: ElementRef

	billing: FormGroup;

	express: any;
	paymentRequest: any;
	cardHandler = this.onChange.bind(this);
	error: string;
	amount: string;
	name: string;

	// STRIPE
	stripe: any;
	elements: any;
	card: any;
	cardNumber: any;
	cardExpiry: any;
	cardCvc: any;

	constructor(
		private GS: GoogleAnalyticsService,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private router: Router,
	) {
	}

	ngOnChanges() {
		if (this.profile) {
			if (this.billing) {
				this.billing.get('firstName').setValue(this.profile.firstName);
				this.billing.get('lastName').setValue(this.profile.lastName);
			}
		}
	}

	ngOnInit() {
		this.stripe = Stripe(environment.stripeKey);
		this.elements = this.stripe.elements();

		this._form();
	}


	ngAfterViewInit() {
		this._mountCardFormFieldsSeparately();
		this._updatedCardInformation();
		this.cd.detectChanges();
	}

	private _checkValidCard() {
		let cardNumberControl = this.billing.get('cardNumberHidden');
		let cardExpiryControl = this.billing.get('cardExpiryHidden');
		let cardCVCControl = this.billing.get('cardCVCHidden');
		let firstName = this.billing.get('firstName');
		let lastName = this.billing.get('lastName');

		if (cardNumberControl.valid && cardExpiryControl.valid && cardCVCControl.valid && firstName.valid && lastName.valid) {
			this.creditCardValidate.emit(true);

		} else {
			this.creditCardValidate.emit(false);
		}
	}

	private _form() {
		this.billing = this.fb.group({
			cardNumberHidden: [false, Validators.requiredTrue],
			cardExpiryHidden: [false, Validators.requiredTrue],
			cardCVCHidden: [false, Validators.requiredTrue],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required]
		});

		if (this.profile) {
			this.billing.get('firstName').setValue(this.profile.firstName);
			this.billing.get('lastName').setValue(this.profile.lastName);
		}

		this.billing.setValidators(this._validateCardInformation());
	}

	private _mountCardFormFieldsSeparately() {
		let style = {
			base: {
				fontFamily: '"AL", sans-serif',
				fontWeight: 'lighter',
				'::placeholder': {
					color: '#999',
				}
			},
			invalid: {
				iconColor: 'red',
				color: 'red',
			}
		};

		if (!this.cardNumber) {
			this.cardNumber = this.elements.create('cardNumber', { style });
			this.cardNumber.mount(this.cardNumberElement.nativeElement);
		}

		if (!this.cardExpiry) {
			this.cardExpiry = this.elements.create('cardExpiry', { style });
			this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
		}

		if (!this.cardCvc) {
			this.cardCvc = this.elements.create('cardCvc', { style });
			this.cardCvc.mount(this.cardCVCElement.nativeElement);
		}

		// this.expressbtn();
	}

	private _updatedCardInformation() {
		if (!this.cardNumber || !this.cardExpiry || !this.cardCvc) {
			return false;
		}

		this.cardNumber.on('change', (event) => {
			let isValid = event.complete;
			this.billing.get('cardNumberHidden').setValue(isValid);
			this._checkValidCard();
		});

		this.cardExpiry.on('change', (event) => {
			let isValid = event.complete;
			this.billing.get('cardExpiryHidden').setValue(isValid);
			this._checkValidCard();
		});

		this.cardCvc.on('change', (event) => {
			let isValid = event.complete;
			this.billing.get('cardCVCHidden').setValue(isValid);
			this._checkValidCard();
		});
	}

	private _validateCardInformation(): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			this._checkValidCard();

			return null;
		};
	}

	createCardToken(additionalInfo: any = {}) {
		const name: string = this.billing.get('firstName').value + ' ' + this.billing.get('lastName').value;
		additionalInfo.name = name;
		let tokenPromise = this.stripe.createToken(this.cardNumber, additionalInfo);
		return tokenPromise;
	}

	ngOnDestroy() {
	}

	onChange({ error }) {
		if (error) {
			this.error = error.message;
		} else {
			this.error = null;
		}
		this.cd.detectChanges();
	}
}
