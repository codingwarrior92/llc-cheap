import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

// RELATED
import { PlanListComponent } from './plan-list.component';

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
		PlanListComponent
	],
	exports: [
		PlanListComponent
	]
})
export class PlanListModule { }
