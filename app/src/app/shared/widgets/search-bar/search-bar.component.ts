import {
	Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef,
	HostListener, HostBinding, NgZone, OnChanges, SimpleChanges, ElementRef,
	ViewChild, AfterViewInit, PLATFORM_ID, Inject, Input
} from '@angular/core';
import { FormControl } from '@angular/forms';

// ROUTER
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

// RXJS
import { BehaviorSubject } from 'rxjs/Rx';
import { Subscription, empty } from 'rxjs';

// SERVICES
import {
	CategoryAPIService, AuthService, LocalStorage, SessionStorage,
	VoiceService, SearchBarService, ProductAPIService,
	GoogleAnalyticsService, BarcodeService
} from '../../../shared/services';

// SSR
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'search-input',
	exportAs: 'search',
	templateUrl: 'search-bar.component.html',
	styleUrls: ['search-bar.component.scss']
})

// CLASS
export class SearchBarComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

	sIndex: number = null;
	dropdownSelectActive: {};
	showDropdown: boolean;
	icon: boolean;
	grocerySelected: boolean;
	hide: boolean;
	closed: boolean;
	submit: boolean;
	lists: any;
	first: boolean;
	foods = [];
	isTypeUPC: boolean;
	searchBarInitialMaxLength: number;
	searchBarCurrentMaxLength: number;
	searchBarUPCTypeMaxLength: number;
	searchbarPlaceholder: string;
	searchbarCategoriesPlaceholder: string;
	searchbarUPCPlaceholder: string;
	upcPlaceholder: string;
	searchInputType: string;
	isEmptyUPCInput: boolean;
	maxFoodNameCharacterLimit: number;
	recentSearches: any = '';

	queryField: FormControl;

	filter: any = '';
	filterName = 'All Groceries';

	searchProductSubscription: Subscription;
	allowSearchAPIRequest: boolean;
	isNewCatIsSelected = false;
	isSearchRequestPending = false;

	private searchProducts$ = new BehaviorSubject({});

	ind = 1;
	catIDQueryParam: string;
	queryQueryParam = '';

	// MOBILE
	mobile: boolean;

	@Input('search')
	set searchInputText(input: string) {
		this.checkEmptyInputRemoveIconSuggestion();
		this.isSearchRequestPending = false;

		input = input.replace('*##1*1##*', '');
		this.queryQueryParam = input;
		this.isEmptyUPCInput = true;
		/*
		* Enable the code if you want to keep text in search page search bar for future use
		*/
		// this.queryField.setValue(this.queryQueryParam);
		// this.resetSearchBarInputSuggestions(input);

		this.inputFocusClass = false;
	}

	get searchInputText(): string {
		return this.queryQueryParam;
	}

	@Output() inputValue = new EventEmitter<string>();

	@HostBinding('class.searchbar-focused') inputFocusClass = false;

	@HostListener('document:click', ['$event'])
	clickOutsideSearchbar(event) {
		if (!this.eRef.nativeElement.contains(event.target) && (this.queryField.value === undefined || this.queryField.value === '')) {
			this.inputFocusClass = false;
		}

		if (!this.eRef.nativeElement.contains(event.target)) {
			this.nodropdown();

			if (this.isNewCatIsSelected === true && this.queryField.value.length >= 2) {
				this.hide = true;
				this.foods = [];
				this.isNewCatIsSelected = false;
			}
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.isMobile();
	}

	constructor(
		private AS: AuthService,
		private BS: BarcodeService,
		private GS: GoogleAnalyticsService,
		public VS: VoiceService,
		private router: Router,
		private route: ActivatedRoute,
		private CS: CategoryAPIService,
		private PS: ProductAPIService,
		private SSS: SessionStorage,
		private LS: LocalStorage,
		public SBS: SearchBarService,
		private changeDetector: ChangeDetectorRef,
		// public SS: RxSpeechRecognitionService,
		private ngZone: NgZone,
		@Inject(PLATFORM_ID) private platform: any,
		private eRef: ElementRef) {
		this.grocerySelected = false;
		this.icon = false;
		this.hide = true;
		this.closed = false;
		this.showDropdown = false;
		this.first = true;
		this.isTypeUPC = false;
		this.searchInputType = 'cat';
		this.upcPlaceholder = '0-00000-00000-0';
		this.isEmptyUPCInput = true;

		this.searchBarInitialMaxLength = 80;
		this.searchBarCurrentMaxLength = this.searchBarInitialMaxLength;
		this.searchBarUPCTypeMaxLength = 15;
		this.maxFoodNameCharacterLimit = 95;

		this.searchbarCategoriesPlaceholder = 'your favorite branded food products.';
		this.searchbarUPCPlaceholder = '0-00000-00000-0';
		this.searchbarPlaceholder = this.searchbarCategoriesPlaceholder;

		this.queryField = new FormControl('');

		this.allowSearchAPIRequest = false;

		this.isMobile();
	}


	ngOnInit() {
		// this.initializeVoiceRecognition();
		this.list();

		/*
		* Enable the code if you want to keep text in search page search bar for future use
		*/
		this.router.events.subscribe((val) => {
			this.queryField.setValue('');
			this.resetFoodList();
			this.icon = false;
			this.hide = true;
			this.closed = false;
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.activateSearchBarCategoryDropdown();
	}

	ngAfterViewInit() {
		this.isMobile();
		this.changeDetector.detectChanges();
	}

	ngOnDestroy() {
		this.unsubscribeSearchRequest();
	}

	private isMobile() {
		if (isPlatformBrowser(this.platform)) {
			this.ngZone.run(() => {
				this.mobile = (window.innerWidth < 767) ? true : false;
			});
		}

		this.searchbarPlaceholder = this.mobile ? 'Search' : 'your favorite branded food products.';
		this.searchbarCategoriesPlaceholder = this.searchbarPlaceholder;
	}

	/**
	* Get response text and process to keep matched text in bold letter
	*/
	printSearchResult(text) {
		let totalChar = this.maxFoodNameCharacterLimit - 1;
		text = text.length > this.maxFoodNameCharacterLimit ? text.substr(0, totalChar) + '...' : text;
		const regex = new RegExp(this.queryField.value, 'ig');
		let replacedText = text.replace(regex, '<strong>$&</strong>');
		return replacedText;
	}

	/**
	* When searchbar is focused
	*/
	onSearchbarFocused() {
		this.removeFocusCSSClassIfNotUPC();

		this.searchbarPlaceholder = (this.isTypeUPC === true) ?
			this.searchbarUPCPlaceholder :
			this.searchbarCategoriesPlaceholder;
	}

	/**
	* When searchbar is blured
	*/
	onSearchbarBlured() {
		if (this.queryField.value === '') {
			this.inputFocusClass = false;
			this.hide = true;
			this.icon = false;
			this.closed = false;
		}

		this.searchbarPlaceholder = (this.isTypeUPC === true) ?
			this.searchbarUPCPlaceholder :
			this.searchbarCategoriesPlaceholder;
		return null;
	}

	nodropdown() {
		this.showDropdown = false;

		this.triggerPreviousSearchRequest();
	}

	list() {
		this.CS.getCat().subscribe(res => {
			if (res) {
				this.lists = res[0]['categories'];
			}
		});
	}

	food(input) {
		this.unsubscribeSearchRequest();
		this.resetFoodList();
		this.isNewCatIsSelected = false;
		this.isSearchRequestPending = false;
		this.closed = false;
		this.hide = true;
		this.searchBarCurrentMaxLength = this.searchBarInitialMaxLength;

		let UPCType = this.checkSearchBarInputTypeUPC(input);

		if (this.queryField.value === '') {
			/**
			* Keep that code for later use if there need to select option on empty input
			*/
			// if(this.searchInputType === 'cat'){
			// 	this.icon = false;
			// 	this.initializeCategoriesInput(input);
			// } else if(this.searchInputType === 'upc'){
			// 	this.isEmptyUPCInput = true;
			// 	this.initializeUPCTypeInput(input);
			// }

			this.icon = false;
			this.initializeCategoriesInput(input);
		} else if (UPCType === true) {
			this.isEmptyUPCInput = false;
			this.searchInputType = 'upc';
			this.initializeUPCTypeInput(input);
			this.processRemainingUPCPlaceholder();
		} else if (UPCType === false) {
			this.searchInputType = 'cat';
			this.initializeCategoriesInput(input);

			if (!this.mobile) {
				this.processTextInputSearchBar(input);
			}
		}
	}

	gEvent(is: string) {
		if (is === 'enter') {
			this.inputValue.subscribe((res) => {
				this.GS.event('search', `Enter - ${res}`, 'enter', 0);
			});
		} else {
			this.GS.event('search', `Select - ${is}`, 'click', 0);
		}
	}

	/**
	* Remove css class "searchbar-focused" if input type is UPC
	*/
	private removeFocusCSSClassIfNotUPC() {
		this.inputFocusClass = this.isTypeUPC === false ? true : false;
	}


	/**
	* Get query parameters from search page
	*/
	private getQueryParameters() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.catIDQueryParam = queryParams.get('cat_id');
			this.queryQueryParam = queryParams.get('query');
		});
	}

	/**
	* Enable search bar close icon
	*/
	private enableSearchBarCloseIcon() {
		this.icon = false;
		this.hide = true;
		this.closed = true;
	}

	/**
	* Upon getting search-inout component, empty search suggestion dropdown
	*/
	private resetSearchBarInputSuggestions(input) {
		if (input === '') {
			return false;
		}

		this.inputFocusClass = true;
		this.unsubscribeSearchRequest();
		this.resetFoodList();
		this.enableSearchBarCloseIcon();
	}
	/**
	* Render search bar for search page
	*/
	private renderSearchBarForSearchPage() {
		if (this.catIDQueryParam != null && this.queryQueryParam != null) {
			this.queryField.setValue(this.queryQueryParam);
			this.inputFocusClass = true;
			this.unsubscribeSearchRequest();
			this.enableSearchBarCloseIcon();

			this.catIDQueryParam = null;
			this.queryQueryParam = null;
		}
	}

	/**
	* Re activate searchbar category dropdown
	*/
	private activateSearchBarCategoryDropdown() {
		if (this.queryField.value === '') {
			this.isTypeUPC = false;
		}
	}

	/**
	* Unsubscribe request if already subscribed
	*/
	private unsubscribeSearchRequest() {
		if (this.searchProductSubscription !== undefined) {
			this.searchProductSubscription.unsubscribe();
		}
	}

	/**
	* When user start input with number then process UPC type
	* Process input field with placeholder 0-00000-00000-0
	* Automatically insert dashes
	*/
	private processUPCTypeSearchBar(input) {
		let newValue: string = this.reformatUPCTypeSearchBar(input);

		this.queryField.setValue(newValue);
	}

	private reformatUPCTypeSearchBar(input) {
		let newValue: string;

		if (input.length > 0) {
			newValue = this.processUPCTypeInput('', input);
		}

		if (newValue !== undefined) {
			return newValue;
		}

		return input;
	}

	/**
	* Process input for UPC format
	*/
	private processUPCTypeInput(newValue, input) {
		input = this.UPCInputValue(input);

		input = input.toString(10).replace(/\D/g, '0').split('').map(Number);

		let inputText: any[] = [];
		input.forEach(function (currentValue, i) {
			inputText.push(currentValue);
			if (i === 0 || i === 5 || i === 10) {
				inputText.push('-');
			}
		})

		return inputText.join('');
	}

	/**
	* Remove close icon if input is empty
	*/
	private resetClosedIconOnEmptyInput() {
		this.closed = this.queryField.value.length < 2 ? false : true;
		this.icon = false;
		this.hide = false;
	}

	/**
	* Send API request for search suggestion list
	*/
	private getAutocompleteSuggestions(input) {
		if (this.allowSearchAPIRequest === false || input.length < 2 ||
			this.showDropdown === true || this.isTypeUPC === true) {
			return empty();
		}

		this.allowSearchAPIRequest = false;

		this.showSearchBarLoader();

		this.isSearchRequestPending = true;

		return this.PS.searchProducts(this.filter, '', input);
	}

	/**
	* Show search bar loader upon triggereing Search API request
	*/
	private showSearchBarLoader() {
		this.resetFoodList();
		this.icon = true;
		this.closed = false;
		this.hide = true;
	}

	/**
	* Process input field to send API request after every one second and check if user already typing
	*/
	private searchSuggestionsAPIRequest(input) {
		this.queryField.valueChanges
			.debounceTime(1000)
			.distinctUntilChanged()
			.switchMap((input) => this.getAutocompleteSuggestions(input))
			.subscribe(res => {
				if (this.showDropdown === true || this.isTypeUPC === true) {
					return false;
				}

				this.resetClosedIconOnEmptyInput();

				this.searchProducts$.next(res);
			});

		this.getObservableProductsFromSearchQuery();
	}

	/**
	* Get subscription search products and process rendering to dropdown list
	*/
	private getObservableProductsFromSearchQuery() {
		this.searchProductSubscription = this.searchProducts$.subscribe(res => {
			this.isSearchRequestPending = false;

			this.resetSearchBarToInitialState();

			this.renderSearchAutoSuggestList(res);

			if (this.showDropdown === true) {
				this.hide = true;
			}
		});
	}

	/**
	* When the search input is not empty then upon changing dropdown cat fire new search
	*/
	private uponChangingCatFireNewSearching() {
		if (this.queryField.value < 2) {
			return false;
		}

		this.unsubscribeSearchRequest();

		this.PS.searchProducts(this.filter, '', this.queryField.value).then(res => {
			this.resetClosedIconOnEmptyInput();

			this.searchProducts$.next(res);
		});

		this.getObservableProductsFromSearchQuery();
	}

	/**
	* Render auto suggest result to search bar dropdown list
	*/
	private renderSearchAutoSuggestList(res) {
		if (res['result'] === undefined) {
			return false;
		}

		this.resetFoodList();

		// tslint:disable-next-line:radix
		let totalRecords = parseInt(res['total']);

		if (totalRecords > 0) {
			this.foods = res['result'];
		} else {

			let noProduct = {
				productId: 0,
				UPC: 0,
				Title: 'No Product found'
			};

			this.foods.push(noProduct);
		}
	}

	/**
	* Process searchbar text for categories
	*/
	private processTextInputSearchBar(input) {
		this.foods = [];

		if (input.length >= 2) {
			this.allowSearchAPIRequest = true;

			this.enableSearchBarCloseIcon();

			this.searchSuggestionsAPIRequest(input);
		} else {
			this.icon = false;
			this.hide = true;
			this.grocerySelected = false;
		}
	}

	private initializeCategoriesInput(input) {
		this.isTypeUPC = false;
		this.searchbarPlaceholder = this.searchbarCategoriesPlaceholder;
		this.inputFocusClass = true;
	}

	private initializeUPCTypeInput(input) {
		this.isTypeUPC = true;
		this.icon = false;
		this.closed = false;
		this.searchbarPlaceholder = this.searchbarUPCPlaceholder;
		this.searchBarCurrentMaxLength = this.searchBarUPCTypeMaxLength;
		this.processUPCTypeSearchBar(input);
		this.inputFocusClass = false;
	}

	/**
	* Get UPC input and set remaining placeholder
	*/
	private processRemainingUPCPlaceholder() {
		let replace = this.queryField.value;
		replace = replace.replace(/[1-9]/g, 0);
		let remainingPlaceholder = this.searchbarUPCPlaceholder.replace(replace, '');
		this.upcPlaceholder = remainingPlaceholder;
	}

	/**
	* Check if search bar input type is UPC or not
	*/
	private checkSearchBarInputTypeUPC(input) {
		let UPCInput: number = this.UPCInputValue(input);

		return (!isNaN(UPCInput)) ? true : false;
	}

	/**
	* Get Number value from UPC format
	*/
	private UPCInputValue(input) {
		const regex = new RegExp('-', 'gi');
		let UPCInput = input.replace(regex, '');

		return UPCInput;
	}

	private resetFoodList() {
		this.foods = [];
	}

	text(event) {
		let k;

		k = event.charCode;  //         k = event.keyCode;  (Both can be used)

		if (this.queryField.value === 0 && k === 32) {
			return false;
		} else if (this.queryField.value.length === 0) {
			this.isEmptyUPCInput = true;
		}

		if (this.isTypeUPC === true && this.isEmptyUPCInput === false) {
			return (k > 47 && k < 58);
		}

		return ((k > 64 && k < 91) || (k > 96 && k < 123) || (k > 47 && k < 58) || k === 8 || k === 32);
	}

	selectFood(v1, v2) {
		if (v1 === 0) {
			return false;
		}

		this.foods = [];
		this.queryField.setValue(v1 + '-' + v2);
		this.grocerySelected = true;
		this.icon = false;
		this.closed = true;

		if (this.filter !== '18203') {
			this.lists.forEach((b) => {
				if (b['id'] === this.filter) {
					let c = b['name'];
					// find product first then build url.

					this.router.navigate(['/groceries/18203/', this.url(c)]);
				}
			});
		} else {
			this.lists.forEach((b) => {
				if (b['id'] === this.filter) {
					let c = b['name'];
					// find product first then build url.

					this.router.navigate(['/groceries/' + b['id'], this.url(c)]);
				}
			});
		}
	}

	close() {
		this.resetFoodList();
		this.unsubscribeSearchRequest();

		this.closed = false;
		this.grocerySelected = false;
		this.showDropdown = false;
		this.inputFocusClass = false;

		this.queryField.setValue('');
	}

	search(event) {
		let a = event.target.value;

		this.resetFoodList();

		if (event.keyCode === 13) {
			if (this.isTypeUPC !== true) {
				let currentInputValue = this.queryField.value;

				if (currentInputValue < 2) {
					return false;
				}

				this.allowSearchAPIRequest = false;

				this.inputValue.emit(currentInputValue);

				let query: string = this.removeLeadingAndTrailingSpace(this.queryField.value);

				if (!this.AS.isAuthenticated()) {
					this.SBS.setRecentlySearchedText(query);
				} else {
					this.SBS.setRecentlySearchedTextToAPI(query);
				}

				this.router.navigate(['/search'], { queryParams: { cat_id: this.filter, query } });
			}

		}

	}

	/**
	* Remove leading and trailing space from text
	*/
	private removeLeadingAndTrailingSpace(query) {
		query = query.trim();
		query = query.replace(/^\s+|\s+$/g, '');

		return query;
	}

	/**
	* When search request is pending and cat dropdown clicked(open) stop searching
	*/
	private keepPreviousSearchRequestPending() {
		this.unsubscribeSearchRequest();
		this.enableSearchBarCloseIcon();

		if (this.isSearchRequestPending === true) {
			this.resetFoodList();
		}
	}

	/**
	* Reset search bar to initial state so nothing is going to work and revmoved all icon removed
	*/
	private resetSearchBarToInitialState() {
		if (this.queryField.value.length < 2) {
			this.emptySidebarIconSuggestion();
			return false;
		}
	}

	/**
	* Empty sidebar contents
	*/
	private emptySidebarIconSuggestion() {
		this.resetFoodList();
		this.icon = false;
		this.closed = false;
		this.hide = true;
		this.isSearchRequestPending = false;
	}

	/**
	* If search bar input is empty remove suggestion and icon
	*/
	private checkEmptyInputRemoveIconSuggestion() {
		if (this.queryField.value.length < 2) {
			this.emptySidebarIconSuggestion();
		}
	}

	/**
	* When search request is pending and cat dropdown clicked(close) restart searching
	*/
	private triggerPreviousSearchRequest() {
		this.resetSearchBarToInitialState();

		if (this.isSearchRequestPending === true) {
			this.isSearchRequestPending = false;

			this.closed = false;
			this.icon = true;
			this.hide = true;

			this.resetFoodList();

			this.uponChangingCatFireNewSearching();
		} else {
			this.hide = (this.icon === false) ? false : true;
		}
	}

	dropdown() {
		this.showDropdown = !this.showDropdown;

		if (this.queryField.value.length < 2) {
			return false;
		}

		if (this.showDropdown === true) {
			if (this.icon === true) {
				this.isSearchRequestPending = true;
			}

			this.keepPreviousSearchRequestPending();
		} else {
			this.triggerPreviousSearchRequest();
		}
	}

	dropdownSelect(v, x: number, name) {
		/**
		* If needs to empty input when changing category enable the code
		*/
		// if(this.filter != v){
		// 	this.resetFoodList();
		// 	this.grocery = '';
		// 	this.closed = false;
		// 	this.icon = false;
		// }

		this.showDropdown = !this.showDropdown;

		if (this.filterName === name) {
			return false;
		}

		this.unsubscribeSearchRequest();

		this.filterName = name;

		v = (v === 0) ? '' : v;

		this.filter = v;

		this.isNewCatIsSelected = true;

		this.searchBarHideShowElements();
		this.uponChangingCatFireNewSearching();

		this.sIndex = x;
		this.first = false;

	}

	/**
	* Upon changing cat from search bar dropdown show/hide elements
	*/
	private searchBarHideShowElements() {
		if (this.queryField.value.length >= 2) {
			this.closed = false;
			this.icon = true;
		}

		this.foods = [];
		this.hide = true;
	}

	private url(i) {
		return i.toLowerCase().replace(/(?:( and )|(&)|(,)|(\s)|[/])+/g, '-');
	}

	/**
	* Process search suggestion URL
	*/
	private processSearchSuggestionURL(productTitle, productID) {
		let productUrl = `/grocery/${this.url(productTitle)}/${productID}`;
		return productUrl;
	}
}
