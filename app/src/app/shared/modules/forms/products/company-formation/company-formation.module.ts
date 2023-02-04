import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyFormationComponent } from './company-formation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyFormationComponent
  ],
  exports: [
    CompanyFormationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompanyFormationModule { }
