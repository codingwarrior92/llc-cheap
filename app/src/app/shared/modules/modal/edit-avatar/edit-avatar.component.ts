import { Component, ViewChild, OnInit, OnDestroy, Input, HostListener, PLATFORM_ID, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';

// FORMS
import { NgForm } from '@angular/forms';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// SERVICES
import { ModalService, UserSettingsService } from '../../../services';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'edit-avatar',
	templateUrl: 'edit-avatar.component.html',
	styleUrls: ['edit-avatar.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class EditAvatarComponent implements OnInit, AfterViewInit, OnDestroy {
	// VIEW CHILD
	@ViewChild('editavatar', { static: false }) editAvatar: any;

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		public userSettingsService: UserSettingsService,
		public MS: ModalService) {
	}

	ngOnInit() { }

	ngAfterViewInit() {
		this.MS.editAvatarModal = this.editAvatar;
	}

	ngOnDestroy() {
		if (this.userSettingsService.subscriptions) {
			this.userSettingsService.subscriptions.unsubscribe();
		}
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
