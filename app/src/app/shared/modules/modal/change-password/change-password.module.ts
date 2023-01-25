import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// RELATED
import { ChangePasswordComponent } from './change-password.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		AlertModule.forRoot(),
	],
	declarations: [
		ChangePasswordComponent
	],
	exports: [
		ChangePasswordComponent
	]
})
export class ChangePasswordModule { }
