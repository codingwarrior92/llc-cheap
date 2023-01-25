import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { CreditCardComponent } from './credit-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { NgxStripeModule } from 'ngx-stripe';

// BOOTSTRAP
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { environment } from '../../../../environments/environment';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		TooltipModule.forRoot(),
		// NgxStripeModule.forRoot(environment.stripeKey)
	],
	declarations: [
		CreditCardComponent,
	],
	exports: [
		CreditCardComponent,
	],
	entryComponents: [
		CreditCardComponent
	]
})
export class CreditCardModule { }
