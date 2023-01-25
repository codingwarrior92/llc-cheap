import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BOOTSTRAP
import { BsDropdownModule, AlertModule } from 'ngx-bootstrap';

import { EditLabelComponent } from './edit-label.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        BsDropdownModule,
        AlertModule.forRoot()
    ],
    exports: [EditLabelComponent],
    declarations: [EditLabelComponent],
    providers: [],
})
export class EditLabelModule { }
