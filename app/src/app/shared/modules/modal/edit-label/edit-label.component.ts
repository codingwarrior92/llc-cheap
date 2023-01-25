import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// RELATED
import { ModalService, ListLabelAPIService, LocalStorage, CommonService } from './../../../services';

@Component({
	selector: 'app-edit-label',
	templateUrl: 'edit-label.component.html',
	styleUrls: ['edit-label.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class EditLabelComponent implements OnInit, AfterViewInit, OnChanges {
	@ViewChild('editlabel', { static: false }) editLabel: any;

	// INPUT
	@Input() userLabels: string[];

	// OUTPUT
	@Output() editLabelAction: EventEmitter<any> = new EventEmitter<any>();

	// ARRAY
	message: Array<object> = [];

	// SUBSCRIPTION
	private _subscriptions: any = new Subscription();

	form: FormGroup;

	// BOOLEAN
	isCreateLabel = false;
	loading = false;

	constructor(
		private _modalService: ModalService,
		private _formBuilder: FormBuilder,
		private _localStorage: LocalStorage,
		private _changeDetector: ChangeDetectorRef,
		private _listLabelService: ListLabelAPIService,
		public commonService: CommonService
	) {
		this._initForm();
	}

	ngOnChanges(changes: { hasOwnProperty: (arg0: string) => any; }) {
		for (const propName in changes) {
			if (changes.hasOwnProperty(propName)) {
				switch (propName) {
					case 'userLabels':
						if (this.userLabels) {
							this.fillLabels(this.userLabels);
						}
						break;

					default:
						break;
				}
			}
		}
	}

	ngOnInit() { }

	ngAfterViewInit() {
		this._modalService.editLabelModal = this.editLabel;
	}

	fillLabels(labels: any[], reset: boolean = true) {
		let labelArray: FormArray = this.form.get('label') as FormArray;

		if (reset) {
			while (labelArray.length !== 0) {
				labelArray.removeAt(0);
			}
		}

		labels.forEach(element => {
			labelArray.push(this._addLabel(element));
		});
	}

	private _initForm() {
		this.form = this._formBuilder.group({
			name: new FormControl(''),
			label: this._formBuilder.array([])
		});

		this.form.setValidators(this._validateChangeLabel());
	}

	private _validateChangeLabel(): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			let formLabels: string[] = this._getLabels();

			const isEqualLabels: boolean = this.userLabels.length === formLabels.length;
			const flag: boolean = this.commonService.isEqualLabels(formLabels, this.userLabels);

			if (isEqualLabels && flag) {
				return { inputChanged: false };
			}

			return null;
		}
	}

	private _addLabel(label: any): FormGroup {
		return this._formBuilder.group({
			edit: new FormControl(false),
			delete: new FormControl(false),
			name: new FormControl(label, Validators.required),
			disabled: new FormControl(false),
			updated: new FormControl(label, Validators.required)
		});
	}

	done() {
		if (this.form.valid) {
			let userId: number = this._localStorage.get('userId');
			let labels: any[] = this._getLabels();

			this._updateLabels(userId, labels);
		}
	}

	createLabelStatus(flag: boolean = true) {
		let labelName: string = this.form.get('name').value;
		let labels: any[] = this._getLabels();

		if (labelName) {
			flag = labels.includes(labelName);
		}

		return flag;
	}

	createLabel() {
		let labelName: string = this.form.get('name').value;
		let labelArray: FormArray = this.form.get('label') as FormArray;
		let labels: any[] = this._getLabels();

		if (labelName && !labels.includes(labelName)) {
			labelArray.push(this._addLabel(labelName));
			this.form.get('name').setValue('');
		}
	}

	private _updateLabels(userId: number, labels: any[]) {
		this.loading = true;

		this._subscriptions.add(this._listLabelService.putUserLabels(userId, labels).subscribe((res) => {
			this.loading = false;

			if (res) {
				this.editLabelAction.emit({ type: 'refresh-labels', labels });

				this._modalService.close();

				let message: any = this._modalService.processModalAlertInformation('success', 'User labels have been updated');
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

			if (element.valid && !element.get('delete').value) {
				labels.push(element.get('updated').value);
			}
		}

		return labels;
	}

	remove(index: number) {
		let labels: FormArray = this.form.get('label') as FormArray;
		let edit: boolean = labels.controls[index].get('edit').value;
		if (edit) {
			labels.controls[index].get('updated').setValue(labels.controls[index].get('name').value);
			labels.controls[index].get('edit').setValue(!labels.controls[index].get('edit').value);
		} else {
			labels.controls[index].get('delete').setValue(!labels.controls[index].get('delete').value);
		}
		this._changeDetector.detectChanges();
	}

	update(index: number) {
		let labels: FormArray = this.form.get('label') as FormArray;
		labels.controls[index].get('edit').setValue(!labels.controls[index].get('edit').value);
		labels.controls[index].get('name').setValue(labels.controls[index].get('updated').value);
		this._changeDetector.detectChanges();
	}

	cancel() {
		this.form.get('name').setValue('');
		this.fillLabels(this.userLabels);
		this._modalService.close();
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
