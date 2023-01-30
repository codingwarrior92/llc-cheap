import { Component, OnInit } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'phx-form',
	templateUrl: 'notfound.component.html'
})
export class NotFoundComponent implements OnInit {

	constructor(meta: Meta, title: Title) {
			title.setTitle('Phenomenex - 404');
	}
	ngOnInit() {
	}
}
