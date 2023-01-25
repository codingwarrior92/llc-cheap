import { Component, ViewChild, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';

// FORMS
import { NgForm } from '@angular/forms';

// SERVICES
import { ModalService, UserSettingsService } from '../../../services';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'edit-account',
	templateUrl: 'edit-account.component.html',
	styleUrls: ['edit-account.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class EditAccountComponent implements AfterViewInit, OnDestroy {

	@ViewChild('editaccount', { static: false }) editAccount: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		public userSettingsService: UserSettingsService,
		public MS: ModalService) {
	}

	ngAfterViewInit() {
		this.MS.editAccountModal = this.editAccount;
	}

	ngOnDestroy() {
		this.userSettingsService.subscriptions.unsubscribe();
	}

	private _isMobile() {
		if (isPlatformBrowser(this.platform)) {
			let mobile: boolean = (window.innerWidth < 767) ? true : false;

			if (mobile) {
				this.MS.close();
			}
		}
	}
}
