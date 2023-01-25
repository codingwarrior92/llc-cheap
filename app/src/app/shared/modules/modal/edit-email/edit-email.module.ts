import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { EditEmailComponent } from './edit-email.component';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap/alert';

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
		EditEmailComponent
	],
	exports: [
		EditEmailComponent
	]
})
export class EditEmailModule { }
