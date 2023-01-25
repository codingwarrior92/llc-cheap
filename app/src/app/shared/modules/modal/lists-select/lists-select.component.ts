import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

// SERVICES
import { ModalService, AuthService, ShoppingListAPIService, LocalStorage, SessionStorage, PlanAPIService } from '../../../services';

// ROUTER
import { Router } from '@angular/router';

// FORMS
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// RXJS
import { Subscription } from 'rxjs';

@Component({
	moduleId: module.id,
	selector: 'lists-select',
	templateUrl: 'lists-select.component.html',
	styleUrls: ['list-select.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ListsSelectComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('select', { static: false }) select: any;

	// NUMBER
	id: number = this.LS.get('userId');

	// FORMGROUP
	form: FormGroup;

	// SUBSCRIPTIONS
	shoppingListSubscription: Subscription;

	// STRING
	load = require('../../../../../assets/img/blank.jpg');

	updating = false;
	type: any;
	text: any;

	constructor(
		private LS: LocalStorage,
		public SLS: ShoppingListAPIService,
		public MS: ModalService,
		private _authService: AuthService,
		private fb: FormBuilder,
		private _router: Router,
		public planService: PlanAPIService,
		private _sessionStorage: SessionStorage,
		private changeDetector: ChangeDetectorRef
	) {}

	ngAfterViewInit() {
		this.MS.selectListsModal = this.select;
	}

	ngOnInit(): void {
		this._form();
		this.fetchRequestType();
	}

	ngOnDestroy() {
		if (this.shoppingListSubscription) {
			this.shoppingListSubscription.unsubscribe();
		}
	}

	fetchRequestType(): void {
		this.MS.fetchModalData().subscribe(res => {
			if (res) {
				this.type = res.type;
				this.text = res.value;
			}
		}, error => error);
	}

	private _form() {
		return this.form = this.fb.group({
			select: [this.SLS.selectedShoppingList, this._validateSelection]
		});
	}

	private _validateSelection(selectedList: AbstractControl) {
		let value = selectedList.value;

		return (Number(value) === 0) ? { selected: false } : null;
	}

	submitListSelection() {
		if (!this._authService.isAuthenticated()) {
			this._router.navigate(['/login']);
			return false;
		}

		this.SLS.message = [];

		this.id = this.LS.get('userId');
		if (this.id) {
			let listID: any = this.form.controls['select'].value;
			if (this.type === 'process-movecopy' && this.text === 'confirmed') {
				this.updateListMultipleItems(listID);
			} else {
				this.updateListSingleItem();
			}
		}
	}

	private updateListMultipleItems(listID: any): void {
		let message: any = this.MS.processModalAlertInformation('success-process-movecopy', 'confirmed', '', listID);
		this.MS.data$.next(message);
		this.MS.close();
	}

	private updateListSingleItem(): void | boolean {
		this.updating = true;
		let listId: number = this.form.controls['select'].value;

		let productId: number = Number(this.MS.obj.productId);
		this.changeDetector.detectChanges();

		this.SLS.updateShoppinglist(this.id, listId, productId).subscribe((res) => {
			this.updating = false;
			this.MS.data$.next(undefined);
			if (res && res.success) {
				this.MS.close();
				let message: any = this.MS.processModalAlertInformation('success', 'Product has been successfully added. ', 'View list', listId);
				this.MS.data$.next(message);
				if (!environment.production) {
					console.log('Shopping List Updated')
				}
				this._sessionStorage.set('refreshPlanLimit', true);
				this.form.get('select').setValue('');
			}
			this.changeDetector.detectChanges();
		}, (error) => {
			this.updating = false;
			if (error.status === 400) {
				this._message('danger', 'Product already added to the list');
			} else {
				this._message('danger', 'Error when adding product')
			}
			if (!environment.production) {
				console.log('Shopping List Error')
			}
			this.form.get('select').setValue('');
			this.changeDetector.detectChanges();
		});
	}

	openCreateListsModal() {
		this.MS.close();
		let message: any = this.MS.processModalAlertInformation('open-create-list', 'confirmed');
		this.MS.data$.next(message);
	}

	private _message(a: any, b: any, c: any = '', d: number = 0) {
		this.SLS.message.push({
			type: a,
			value: b,
			linkTitle: c,
			listId: d
		})
	}

	private _close(a: AlertComponent) {
		this.SLS.message = this.SLS.message.filter((i) => i !== a);
	}
}
