import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterListsComponent } from './filter-lists.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, ReactiveFormsModule
    ],
    exports: [FilterListsComponent],
    declarations: [FilterListsComponent],
    providers: [],
})
export class FilterListsModule { }
