import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyFormationComponent } from './company-formation.component';

@NgModule({
  declarations: [
    CompanyFormationComponent
  ],
  exports: [
    CompanyFormationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompanyFormationModule { }
