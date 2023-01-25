import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

import { ChangeLabelComponent } from './change-label.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		AlertModule.forRoot()
	],
	exports: [ChangeLabelComponent],
	declarations: [ChangeLabelComponent],
	providers: [],
})
export class ChangeLabelModule { }
