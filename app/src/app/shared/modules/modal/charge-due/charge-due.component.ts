import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';

// SUBSRIPTIONS
import { Subscription } from 'rxjs';

// SERVICES
import { ModalService, UserAPIService, LocalStorage } from '../../../services';

// INTERFACES
import { IProfile, PaymentMethod } from '../../../interfaces';

@Component({
	moduleId: module.id,
	selector: 'charge-due',
	templateUrl: 'charge-due.component.html',
	styleUrls: ['charge-due.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ChargeDueComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('chargedue', { static: false }) chargeDue: any;

	@Output() paymentMethods: EventEmitter<PaymentMethod[]> = new EventEmitter();

	cardValidated = false;
	loading = false;

	profile: IProfile;

	private _subscriptions: any = new Subscription();

	constructor(
		private _modalService: ModalService,
		private _userService: UserAPIService,
		private _localStorage: LocalStorage
	) { }

	ngOnInit() {
		this._getUserInformation();
	}

	ngAfterViewInit() {
		this._modalService.chargeDueModal = this.chargeDue;
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	getCreditCardValidationInformation(data) {
		this.cardValidated = data;
	}

	private _getUserInformation() {
		let userInformation$: any = this._userService.getUserProfile();
		this._subscriptions.add(userInformation$.subscribe((res: IProfile) => {
			if (res) {
				this.profile = res;
			}
		}));
	}

	payDue(creditCard: any) {
		let tokenPromise = creditCard.createCardToken();

		this.loading = true;

		tokenPromise.then((res: any) => {
			if (res.token) {
				let obj: any = {
					token: res.token['id']
				}

				let userId: number = this._localStorage.get('userId');

				this._subscriptions.add(this._userService.chargeCustomer(userId, obj).subscribe((res) => {
					if (res) {
						this.loading = false;
						this.paymentMethods.emit(res);
						this._modalService.close();
						let message: any = this._modalService.processModalAlertInformation('update-billing', 'Your due balance has been successfully paid.');
						this._modalService.data$.next(message);
					}
				}, (error) => {
					this.loading = false;
					let message: any = this._modalService.processModalAlertInformation('update-billing-error', 'Something went wrong');
					this._modalService.data$.next(message);
				}));
			}
		});
	}
}
