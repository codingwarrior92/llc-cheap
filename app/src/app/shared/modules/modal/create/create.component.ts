import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

// SERVICES
import { ModalService, ShoppingListAPIService, LocalStorage } from '../../../services';

// FORMS
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'lists-create',
	templateUrl: 'create.component.html',
	styleUrls: ['create.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ListsCreateComponent implements AfterViewInit {
	@ViewChild('create', { static: false }) create: any;

	@Output() lists: EventEmitter<any[]> = new EventEmitter();

	// NUMBER
	id: number = this.LS.get('userId');

	// FORMGROUP
	form: FormGroup;

	// BOOLEAN
	saving = false;

	// STRING
	load = require('../../../../../assets/img/blank.jpg');

	constructor(
		private LS: LocalStorage,
		private SLS: ShoppingListAPIService,
		public MS: ModalService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
	) {
		this._form();
	}

	ngAfterViewInit() {
		this.MS.createListsModal = this.create;
	}

	private _form() {
		return this.form = this.fb.group({
			input: ['', [Validators.compose([Validators.required, Validators.minLength(1)]), Validators.pattern('^[a-zA-Z0-9 \-\']+')]],
			visible: ['Public', Validators.required]
		});
	}

	submitListCreation(form): void {
		if (this.id) {
			this.saving = true;

			this.SLS.message = [];

			let name: any = form.controls['input'].value;
			let visibility: string = form.controls['visible'].value;

			let productId: any = Number(this.MS.obj.productId);

			let shoppingListObject: object = productId ? {
				'list': [productId],
				visibility
			} : {
					'list': [],
					visibility
				};

			this.MS.data$.next(undefined);
			this.changeDetector.detectChanges();
			this.SLS.postShoppinglist(this.id, name, shoppingListObject).subscribe((res) => {
				this.saving = false;
				this.MS.data$.next(undefined);
				if (res) {
					this.MS.close();
					this.lists.emit(res);

					let latestList: any = res.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b);
					let message: any = productId ?
						this.MS.processModalAlertInformation('success-product-list-created', 'List has been created, and product has been added. ', 'View list', latestList.id) :
						this.MS.processModalAlertInformation('success-list-created', 'List has been successfully created.');
					this.MS.data$.next(message);

					if (!environment.production) {
						console.log('Shopping List Posted')
					}
				}
				form.get('input').setValue('');
				this.changeDetector.detectChanges();
			}, (error) => {
				this.saving = false;
				let message: any;
				switch (error.status) {
					case 400:
						switch (error.error['errorCode']) {
							case 'SHOPPING_LIST_QUOTA_EXCEEDED':
								message = this.MS.processModalAlertInformation('danger', 'User exceeded allocated number of list.');
								break;

							case 'NAME_ALREADY_EXISTS':
								message = this.MS.processModalAlertInformation('danger', `A list with name '${form.get('input').value}' already exists.`);
								break;

							default:
								message = this.MS.processModalAlertInformation('danger', 'Product already added to the list');
								break;
						}
						break;

					default:
						message = this.MS.processModalAlertInformation('danger', 'There was error creating new list.');
						break;
				}

				if (message) { this.MS.data$.next(message); }

				if (!environment.production) {
					console.log('Shopping List Error')
				}
				form.get('input').setValue('');
				this.changeDetector.detectChanges();
			});
		}
	}
}
