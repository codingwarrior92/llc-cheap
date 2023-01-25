import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { ListOptionsComponent } from './list-options.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ListOptionsComponent
	],
	exports: [
		ListOptionsComponent
	]
})
export class ListOptionsModule { }
