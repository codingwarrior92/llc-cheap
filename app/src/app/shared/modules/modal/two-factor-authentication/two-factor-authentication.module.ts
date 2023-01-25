import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { TwoFactorAuthenticationComponent } from './two-factor-authentication.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		TwoFactorAuthenticationComponent
	],
	exports: [
		TwoFactorAuthenticationComponent
	]
})
export class TwoFactorAuthenticationModule { }
