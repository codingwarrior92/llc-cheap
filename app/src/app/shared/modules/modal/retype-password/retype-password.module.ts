import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// RELATED
import { RetypePasswordComponent } from './retype-password.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		AlertModule.forRoot()
	],
	declarations: [
		RetypePasswordComponent
	],
	exports: [
		RetypePasswordComponent
	]
})
export class RetypePasswordModule { }
