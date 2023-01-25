import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// RELATED
import { AddPaymentMethodComponent } from './add-payment-method.component';
import { CreditCardModule } from '../../../widgets/credit-card/credit-card.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		AlertModule.forRoot(),
		CreditCardModule,
	],
	declarations: [
		AddPaymentMethodComponent
	],
	exports: [
		AddPaymentMethodComponent
	]
})
export class AddPaymentMethodModule { }
