import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// LAZY
import { LazyLoadImageModule } from 'ng-lazyload-image';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// RELATED
import { ListsSelectComponent } from './lists-select.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		LazyLoadImageModule,
		AlertModule.forRoot(),
	],
	declarations: [
		ListsSelectComponent
	],
	exports: [
		ListsSelectComponent
	]
})
export class ListsSelectModule { }
