import { Component, ViewChild, AfterViewInit, ViewEncapsulation, Input } from '@angular/core';

// SEO
import { Title } from '@angular/platform-browser';

// ROUTER
import { Router } from '@angular/router';

// SHARE
import { NgNavigatorShareService } from 'ng-navigator-share';

// SERVICES
import { ModalService } from '../../../services';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

import { Subscription } from 'rxjs';

@Component({
	moduleId: module.id,
	selector: 'list-options',
	templateUrl: 'list-options.component.html',
	styleUrls: ['list-options.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ListOptionsComponent implements AfterViewInit {
	@Input() listId: string;

	@ViewChild('listoptions', { static: false }) listOptions: any;

	config = {
		animated: false,
		backdrop: true,
	};

	private _subscriptions: any = new Subscription();

	constructor(
		public modalService: ModalService,
		private _NSS: NgNavigatorShareService,
		private _title: Title,
		private _router: Router
	) { }

	ngAfterViewInit() {
		this.modalService.createListOptionsModal = this.listOptions;
	}

	shareMobileList() {
		this._NSS.share({
			title: this._title.getTitle(),
			url: this._router.url.toString() + this.modalService.obj['listId'],
		})
			.then(response => {
				if (!environment.production) {
					console.log(response);
				}
			})
			.catch(error => {
				if (!environment.production) {
					console.log(error);
				}
			});
	}

	deleteList() {
		let message: any;

		this.modalService.close();

		message = this.modalService.processModalAlertInformation('empty-message', 'confirmed');
		this.modalService.data$.next(message);

		message = this.modalService.processModalAlertInformation('options-deletelist', 'Are you sure to delete the list? ', '', this.modalService.obj['listId']);
		this.modalService.openConfirmationModal(this.config);
		this.modalService.data$.next(message);
	}

	exportList() {
		let message: any;
		message = this.modalService.processModalAlertInformation('empty-message', 'confirmed');
		this.modalService.data$.next(message);

		message = this.modalService.processModalAlertInformation('export-list', 'confirmed', '', this.modalService.obj['listId']);
		this.modalService.data$.next(message);
	}

	changeLabels() {
		let message: any;

		this.modalService.close();

		message = this.modalService.processModalAlertInformation('empty-message', 'confirmed');
		this.modalService.data$.next(message);

		message = this.modalService.processModalAlertInformation('dynamic-change-label', 'confirmed', '', this.modalService.obj['listId']);
		this.modalService.data$.next(message);
	}
}
