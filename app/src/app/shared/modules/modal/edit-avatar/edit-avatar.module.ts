import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { EditAvatarComponent } from './edit-avatar.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		EditAvatarComponent
	],
	exports: [
		EditAvatarComponent
	]
})
export class EditAvatarModule { }
