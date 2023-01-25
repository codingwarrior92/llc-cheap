import { Component, ViewChild, AfterViewInit, OnDestroy, Output, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';

// SUBSCRIPTIONS
import { Subscription } from 'rxjs';

// SERVICES
import { ModalService, ProductAPIService, SubscriptionAPIService, LocalStorage, UserAPIService, RegisterService } from '../../../services';

// INTERFACES
import { ISubscription } from '../../../interfaces';

// FORMS
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	moduleId: module.id,
	selector: 'plan-list',
	templateUrl: 'plan-list.component.html',
	styleUrls: ['plan-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class PlanListComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('planlist', { static: false }) planList: any;

	@Output() activePlan: EventEmitter<ISubscription> = new EventEmitter();

	// SUBSCRIPTIONS
	private _subscriptions: any = new Subscription();

	// STRING
	plan: string;

	// Plan/Add ons subscriptions
	basicMonthlyPlan: ISubscription[];
	eliteMonthlyPlan: ISubscription[];
	planSubscriptionPay: number;
	plansLoaded: boolean;

	// FORMGROUP
	planGroup: FormGroup;

	// INTERFACES
	userSubscription: any;

	// BOOLEAN
	loading = false;

	constructor(
		private _modalService: ModalService,
		private _productService: ProductAPIService,
		private _formBuilder: FormBuilder,
		private _userService: UserAPIService,
		private _subscriptionService: SubscriptionAPIService,
		private _localStorage: LocalStorage,
		private _registerService: RegisterService
	) { }

	ngOnInit() {
		this._form();
		this._getUserSubscription();
		this._processPricingPlans();
	}

	ngAfterViewInit() {
		this._modalService.planListModal = this.planList;
	}

	ngOnDestroy() {
		this._subscriptions.unsubscribe();
	}

	disablePlanUpdate(): boolean {
		if (this.loading || !this.planGroup.valid || !this.userSubscription || this.userSubscription['plan'] !== 'free' || !this._registerService.allSubscriptions) { return true; }

		let selectedPlan: string = this.planGroup.get('plan').value;
		let disable: boolean;

		switch (selectedPlan) {
			case 'free':
				disable = this.userSubscription.plan === 'free';
				break;

			default:
				let planObject: any = this._registerService.allSubscriptions.find((plan: ISubscription) => plan.planId === selectedPlan);
				disable = planObject && (planObject.planCategory === this.userSubscription.plan) ? true : false;
				break;
		}

		return disable;
	}

	disablePlanSelection(planType: string, planObject: any = {}): boolean {
		if (this.loading || !this.userSubscription || !this._registerService.allSubscriptions) { return true; }

		let disable: boolean;

		switch (planType) {
			case 'free':
				disable = this.userSubscription.plan !== 'free';
				break;

			default:
				if (this.userSubscription.plan === 'free') {
					disable = false;
					break;
				}

				disable = planObject.planId !== this.userSubscription.stripePlanId;
				break;
		}

		return disable;
	}

	private _getUserSubscription() {
		let subscription$: any = this._subscriptionService.getSubscription();

		this._subscriptions.add(subscription$.subscribe((res: ISubscription) => {
			if (res) {
				this.userSubscription = res;

				this._renderUserSubscription();
			}
		}));
	}

	private _renderUserSubscription(): void | boolean {
		if (!this.userSubscription || !this.planGroup) { return false; }

		let userPlan: string = this.userSubscription['plan'];

		switch (userPlan) {
			case 'free':
				this.planGroup.get('plan').setValue(userPlan);
				break;

			default:
				if (this._registerService.allSubscriptions) {
					let planObject: any = this._registerService.allSubscriptions.find((plan: any) => plan.planCategory === userPlan && plan.planInterval === 'month');
					if (planObject) {
						this.planGroup.get('plan').setValue(planObject.planId);
					}
				}
				break;
		}
	}

	private _form() {
		this.planGroup = this._formBuilder.group({
			plan: ['', Validators.required]
		});
	}

	private _processPricingPlans() {
		this._subscriptions.add(this._productService.getPricingPlans().subscribe((res: ISubscription[]) => {
			if (!res) {
				return false;
			}

			this.plansLoaded = true;

			this._registerService.initializeSubscriptions(res);

			this._renderUserSubscription();
			this._initializeSubscriptions();
		}));
	}

	private _initializeSubscriptions() {
		this.basicMonthlyPlan = this._registerService.getQuarterSubscriptions('basic', 'month');
		this.eliteMonthlyPlan = this._registerService.getQuarterSubscriptions('elite', 'month');
	}

	handlePlanChange(plan: string) {
		if (this.userSubscription && this.userSubscription['plan'] === 'free') {
			this.planGroup.get('plan').setValue(plan);
		}
	}

	editUserPlan() {
		if (!this.planGroup.valid) {
			return false;
		}

		this.loading = true;

		let userId: number = this._localStorage.get('userId');

		let plan: string = this.planGroup.get('plan').value;

		let obj: any = {
			userId,
			plan
		}

		this._subscriptions.add(this._userService.createSubscription(obj).subscribe((res) => {
			if (res) {
				this.loading = false;
				this.activePlan.emit(res);
				this.planGroup.get('plan').setValue(plan);
				this.userSubscription = res[0];
				this._subscriptionService.subscription$.next(this.userSubscription);
				this._modalService.close();
				let message: any = this._modalService.processModalAlertInformation('subscription-plan-changed', 'The subscription plan has been changed successfully');
				this._modalService.data$.next(message);
			}
		}, (error) => {
			this.loading = false;

			if (error.status === 400) {
				let message: any = this._modalService.processModalAlertInformation('subscription-error', 'Subscription plan already exists');
				this._modalService.data$.next(message);
			}
		}));
	}
}
