import { Component, EventEmitter, Input, OnInit, OnChanges, Output, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { ModalService } from './../../../services/modal/modal.service';

@Component({
	selector: 'app-filter-lists',
	templateUrl: 'filter-lists.component.html',
	styleUrls: ['filter-lists.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class FilterListsComponent implements OnChanges, OnInit, AfterViewInit {
	@ViewChild('filterlists', { static: false }) filterLists: any;

	// INPUT
	@Input() userLabels: string[];
	@Input() checkedLabels: string[] = [];

	// OUTPUT
	@Output() filterLabels: EventEmitter<any> = new EventEmitter<any>();

	form: FormGroup;

	constructor(
		private _modalService: ModalService,
		private _formBuilder: FormBuilder
	) { }

	ngOnChanges() {
		if (this.form) {
			this._fillLabels(this.userLabels);
		}
	}

	ngOnInit() {
		this._init();
	}

	ngAfterViewInit() {
		this._modalService.filterListsModal = this.filterLists;
	}

	private _init() {
		this.form = this._formBuilder.group({
			enableSubmission: new FormControl(false, Validators.requiredTrue),
			label: new FormArray([])
		});

		this._fillLabels(this.userLabels, false);

		this.form.get('label').valueChanges.subscribe(changes=> {
			this.form.get('enableSubmission').setValue(true);
		})
	}

	private _fillLabels(labels: any[], reset: boolean = true) {
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

	private _addLabel(label: any): FormGroup {
		return this._formBuilder.group({
			name: new FormControl(label, Validators.required),
			selected: new FormControl(false)
		});
	}

	done() {
		if (this.form.valid) {
			const labels: string[] = this._getLabels();

			this.form.get('enableSubmission').setValue(false);

			this.filterLabels.emit({ type: 'filter-labels', labels });

			this._modalService.close();
		}
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

	onChangeListLabel(control: FormControl) {
		let checked: boolean = !control.get('selected').value;
		let label: string = control.get('name').value;

		if (checked) {
			this.checkedLabels.push(label);
		} else {
			this.checkedLabels = this.checkedLabels.filter(e => e !== label);
		}

		control.get('selected').setValue(checked);
	}
}