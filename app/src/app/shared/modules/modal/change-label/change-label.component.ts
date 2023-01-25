import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';

import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

import { ModalService, ListLabelAPIService, LocalStorage, CommonService } from '../../../services';

@Component({
	selector: 'app-change-label',
	templateUrl: 'change-label.component.html',
	styleUrls: ['change-label.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class ChangeLabelComponent implements OnInit, OnChanges, AfterViewInit {
	@ViewChild('changelabel', { static: false }) changeLabelModal: any;

	// INPUT
	@Input() listId: any;
	@Input() userLabels: any[];

	// OUTPUT
	@Output('labelAction') labelAction: EventEmitter<any> = new EventEmitter<any>();

	// ARRAY
	message: Array<object> = [];
	listLabels: string[] = [];

	// SUBSCRIPTIONS
	private _subscriptions: any = new Subscription();

	// FORMGROUP
	form: FormGroup;

	// BOOLEAN
	isCreateLabel = false;
	loading = false;
	loadingData = false;

	constructor(
		private _modalService: ModalService,
		private _formBuilder: FormBuilder,
		private _localStorage: LocalStorage,
		private _route: ActivatedRoute,
		public commonService: CommonService,
		private _listLabelService: ListLabelAPIService
	) {
		this._initForm();
	}

	ngOnChanges(changes: SimpleChanges) {
		for (const propName in changes) {
			if (changes.hasOwnProperty(propName)) {
				switch (propName) {
					case 'listId': {
						if (this.listId && changes[propName].currentValue !== changes[propName].previousValue) {
							this.loadingData = true;
							this._getUserListLabels();
						} else {
							this.loadingData = false;
						}
					}
					// tslint:disable-next-line:no-switch-case-fall-through
					case 'userLabels':
						if (this.userLabels && changes[propName].currentValue !== changes[propName].previousValue) {
							this._fillLabels(this.userLabels);
						}
						break;

					default:
						break;
				}
			}
		}
	}

	ngOnInit() {
		this._labelNameChanges();
	}

	ngAfterViewInit() {
		this._modalService.changeLabelModal = this.changeLabelModal;
	}

	private _labelNameChanges() {
		this._subscriptions.add(this.form.get('name').valueChanges.subscribe(res => {
			this.isCreateLabel = false;

			this._refreshLabels(res);

			if (res) {
				this._isCreateLabel();
			}
		}, error => {
			if (error.status === 400) {
				this._message('danger', 'Label is already created');
			} else {
				this._message('danger', 'Something went wrong');
			}
		}));
	}

	private _refreshLabels(text: string) {
		let labelArray: FormArray = this.form.get('label') as FormArray;
		let labelLength: number = labelArray.length;

		while (labelLength > 0) {
			labelLength = labelLength - 1;

			if (text) {
				let label: string = labelArray.controls[labelLength].get('name').value;

				if (label.startsWith(text) || label === text) {
					labelArray.controls[labelLength].get('disabled').setValue(false);
				} else {
					labelArray.controls[labelLength].get('disabled').setValue(true);
				}
			} else {
				labelArray.controls[labelLength].get('disabled').setValue(false);
			}
		}
	}

	private _isCreateLabel() {
		let labelArray: FormArray = this.form.get('label') as FormArray;
		let labelLength: number = labelArray.length;
		let flag = true;

		while (labelLength > 0) {
			labelLength = labelLength - 1;

			if (!labelArray.controls[labelLength].get('disabled').value) {
				flag = false;
				break;
			}
		}

		this.isCreateLabel = flag;
	}

	private _initForm() {
		this.form = this._formBuilder.group({
			name: new FormControl(''),
			label: new FormArray([])
		});

		this.form.setValidators(this._validateChangeLabel())
	}

	private _validateChangeLabel(): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			let formLabels: string[] = this._getLabels();

			const isEqualLabels: boolean = this.listLabels.length === formLabels.length;
			const flag: boolean = this.commonService.isEqualLabels(formLabels, this.listLabels);

			if (isEqualLabels && flag) {
				return { inputChanged: false };
			}

			return null;
		}
	}

	private _getUserListLabels() {
		let userId: number = this._localStorage.get('userId');

		this._subscriptions.add(this._listLabelService.getUserListLabels(userId, this.listId).subscribe((res) => {
			if (res) {
				this.listLabels = res;
				this.loadingData = false;

				this._listLabelService.data$.next(res);

				if (this.userLabels && this.userLabels.length > 0) {
					this._fillLabels(this.userLabels);
				}
				this.isCreateLabel = false;
			}
		}, error => {
			if (error.status === 400) {
				this._message('danger', 'Label is already created');
			} else {
				this._message('danger', 'Something went wrong');
			}
		}));
	}

	resetUserLabels() {
		this.form.get('name').setValue('');
		this._fillLabels(this.userLabels);
	}

	private _fillLabels(labels: any[], reset: boolean = true) {
		let labelArray: FormArray = this.form.get('label') as FormArray;

		if (reset) {
			while (labelArray.length !== 0) {
				labelArray.removeAt(0)
			}
		}

		labels.forEach(element => {
			labelArray.push(this._addLabel(element));
		});
	}

	private _addLabel(label: any): FormGroup {
		let selected: boolean = this.listLabels.includes(label);

		return this._formBuilder.group({
			name: new FormControl(label, Validators.required),
			selected: new FormControl(selected),
			disabled: new FormControl(false)
		});
	}

	done() {
		if (this.form.valid && this.listId) {
			let userId: number = this._localStorage.get('userId');
			let labels: string[] = this._getLabels();

			this.loading = true;

			let message: any = this._modalService.processModalAlertInformation('empty-message', 'confirmed');
			this._modalService.data$.next(message);
			this._updateLabels(userId, this.listId, labels);
		}
	}

	private _updateLabels(userId: number, listId: string, labels: any[]) {
		this._subscriptions.add(this._listLabelService.putUserListLabels(userId, listId, labels).subscribe((res) => {
			this.loading = false;
			if (res) {
				this.listLabels = res;
				this._listLabelService.data$.next(res);
				this._modalService.close();

				let message: any = this._modalService.processModalAlertInformation('success', 'User labels have been updated.');
				this._modalService.data$.next(message);
			}
		}, error => {
			this.loading = false;

			if (error.status === 400) {
				this._message('danger', 'Label is already created');
			} else {
				this._message('danger', 'Something went wrong');
			}
		}));
	}

	private _getLabels() {
		let labelsArray: FormArray = this.form.get('label') as FormArray;
		let labels: string[] = [];
		for (let i = 0; i < labelsArray.length; i++) {
			const element = labelsArray.at(i);

			if (element.valid && element.get('selected').value) {
				labels.push(element.get('name').value);
			}
		}

		return labels;
	}

	createListLabel() {
		let userId: number = this._localStorage.get('userId');
		let label: string = this.form.get('name').value;
		if (this.listId) {
			this.loading = true;
			this._createLabel(userId, this.listId, label);
		}
	}

	private _createLabel(userId: number, listId: string, label: string) {
		this._subscriptions.add(this._listLabelService.postUserLabel(userId, label).subscribe((res) => {
			if (res) {
				this._createListLabel(userId, listId, label, res);
			}
		}, error => {
			if (error.status === 400) {
				this._message('danger', 'Label is already created');
			} else {
				this._message('danger', 'Something went wrong');
			}
		}))
	}

	private _createListLabel(userId: number, listId: string, label: string, labels: string[]) {
		this._subscriptions.add(this._listLabelService.createUserListLabel(userId, listId, label).subscribe((res) => {
			this.loading = false;
			if (res) {
				this.listLabels = res;
				this.form.get('name').setValue('');

				this._listLabelService.data$.next(res);
				this.labelAction.emit({ type: 'refresh-labels', labels });
				this._modalService.close();

				let message: any = this._modalService.processModalAlertInformation('success', `User label "${label}" has been created and added to list.`);
				this._modalService.data$.next(message);
			}
		}, error => {
			if (error.status === 400) {
				this._message('danger', 'Label is already created');
			} else {
				this._message('danger', 'Something went wrong');
			}
		}));
	}

	private _message(a: any, b: any, c: any = '', d: number = 0) {
		this.message.push({
			type: a,
			value: b,
			linkTitle: c,
			listId: d
		})
	}

	close(a: AlertComponent) {
		this.message = this.message.filter((i) => i !== a);
	}
}
