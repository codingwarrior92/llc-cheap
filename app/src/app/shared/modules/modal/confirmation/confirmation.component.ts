import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

// SERVICES
import { ModalService } from '../../../services';

@Component({
	moduleId: module.id,
	selector: 'confirmation-popup',
	templateUrl: 'confirmation.component.html',
	styleUrls: ['confirmation.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ConfirmationPopupComponent implements OnInit, AfterViewInit {
	@ViewChild('confirmation', { static: false }) confirmation: any;

	text: string;
	type: string;
	value: any;

	constructor(
		public MS: ModalService
	) {
	}

	ngOnInit(): void {
		this.MS.data$.next(undefined);
		this.getPopupMessage();
	}

	ngAfterViewInit(): void {
		this.MS.confirmationModal = this.confirmation;
	}

	private getPopupMessage(): void {
		this.MS.fetchModalData().subscribe(res => {
			if (res) {
				this.type = res.type;
				this.text = res.value;
				this.value = res.listId;
			}
		}, error => error);
	}

	confirmAction(): void {
		let message: any;

		switch (this.type) {
			case 'deleteall':
				message = this.MS.processModalAlertInformation('success-deleteall', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'selectall':
				message = this.MS.processModalAlertInformation('success-selectall', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'uncheckall':
				message = this.MS.processModalAlertInformation('success-uncheckall', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'deletecompleted':
				message = this.MS.processModalAlertInformation('success-deletecompleted', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'movecopy':
				message = this.MS.processModalAlertInformation('success-movecopy', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'deletelist':
				message = this.MS.processModalAlertInformation('success-deletelist', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'options-deletelist':
				message = this.MS.processModalAlertInformation('success-options-deletelist', 'confirmed', '', this.value);
				this.MS.data$.next(message);
				break;
			case 'exportlist':
				message = this.MS.processModalAlertInformation('success-exportlist', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'deletecard':
				message = this.MS.processModalAlertInformation('success-deletecard', 'confirmed');
				this.MS.data$.next(message);
				break;
			case 'cancel-subscription':
				message = this.MS.processModalAlertInformation('success-cancel-subscription', 'confirmed');
				this.MS.data$.next(message);
				break;
			case `change-list-label-${this.value.id}`:
				message = this.MS.processModalAlertInformation(`success-change-list-label-${this.value.id}`, 'confirmed', '', this.value);
				this.MS.data$.next(message);
				break;
			default:
				break;
		}

		this.MS.close();
	}

	cancelAction(): void {
		this.MS.close();
	}

}
