import { Component, ViewChild, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';

// SERVICES
import { ModalService, DeviceService, ShoppingListAPIService, LocalStorage } from '../../../services';

// RXJS
import { Subscription } from 'rxjs';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

// PLATFORM
import { isPlatformBrowser } from '@angular/common';

// ENVIRONMENT
import { environment } from '../../../../../environments/environment';

@Component({
	moduleId: module.id,
	selector: 'share-list',
	templateUrl: 'share-list.component.html',
	styleUrls: ['share-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})

// CLASS
export class ShareListComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('sharelist', { static: false }) shareList: any;

	// ARRAY
	message: Array<object> = [];

	// ANY
	type: any;
	text: any;
	subscriptions: any;
	selectedList: any;

	// NUMBER
	id: number = this.LS.get('userId') === null || this.LS.get('userId') === undefined ? 0 : this.LS.get('userId');

	// STRING
	listImage: string;
	listUrl: string;
	load = require('../../../../../assets/img/blank.jpg');

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._isMobile();
	}

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private LS: LocalStorage,
		private SLS: ShoppingListAPIService,
		public MS: ModalService,
		private DS: DeviceService
	) {
		this.subscriptions = new Subscription();
	}

	ngOnInit() {
		this.fetchRequestType();
	}

	ngAfterViewInit() {
		this.MS.shareListModal = this.shareList;
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	private _isMobile() {
		if (isPlatformBrowser(this.platform)) {
			let mobile: boolean = (window.innerWidth < 767) ? true : false;

			if (mobile) {
				this.MS.close();
				this.message = [];
			}
		}
	}

	fetchRequestType(): void {
		this.subscriptions.add(this.MS.fetchModalData().subscribe(res => {
			if (res) {
				if (res.type === 'share-list') {
					this.selectedList = undefined;
					this.MS.data$.next(undefined);
					this.message = [];

					this.subscriptions.add(this.SLS.getList(this.id, res.listId).subscribe((data) => {
						this.selectedList = data;
						this.listImage = (data['list'][0] && data['list'][0]['productThumbnailUrl']) ? data['list'][0]['productThumbnailUrl'] : '';
						this.listUrl = 'https://grceri.com/lists/' + data['id'];
					}));
				}
			}
		}, error => error));
	}

	copyListURL(input) {
		input.focus();
		input.select();
		document.execCommand('copy');
		this.message = [];
		this._message('success', 'Link copied');
	}

	private _message(a: any, b: any, c: any = '', d: any = '') {
		this.message.push({
			type: a,
			value: b,
			linkTitle: c,
			listId: d,
		});
	}

	private _close(a: AlertComponent) {
		this.message = this.message.filter(i => i !== a);
	}
}
