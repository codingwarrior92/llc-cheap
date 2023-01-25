import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// LAZY LOAD
import { LazyLoadImageModule } from 'ng-lazyload-image';

// RELATED
import { ShareListComponent } from './share-list.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
    AlertModule.forRoot(),
    LazyLoadImageModule,
	],
	declarations: [
		ShareListComponent
	],
	exports: [
		ShareListComponent
	]
})
export class ShareListModule { }
