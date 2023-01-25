import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { ConfirmationPopupComponent } from './confirmation.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule
	],
	declarations: [
		ConfirmationPopupComponent
	],
	exports: [
		ConfirmationPopupComponent
	]
})
export class ConfirmationPopupModule { }
