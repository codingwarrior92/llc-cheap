import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { ChargeDueComponent } from './charge-due.component';
import { CreditCardModule } from '../../../widgets/credit-card/credit-card.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
    CreditCardModule
	],
	declarations: [
		ChargeDueComponent
	],
	exports: [
		ChargeDueComponent
	]
})
export class ChargeDueModule { }
