import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// LAZY
import { LazyLoadImageModule } from 'ng-lazyload-image';

// RELATED
import { ListsCreateComponent } from './create.component';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

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
		ListsCreateComponent
	],
	exports: [
		ListsCreateComponent
	],
	entryComponents: [
		ListsCreateComponent
	]
})
export class ListsCreateModule { }
