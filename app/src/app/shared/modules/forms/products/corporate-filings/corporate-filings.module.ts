import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateFilingsComponent } from './corporate-filings.component';

@NgModule({
  declarations: [
    CorporateFilingsComponent
  ],
  exports: [
    CorporateFilingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CorporateFilingsModule { }
