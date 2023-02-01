import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateSuppliesComponent } from './corporate-supplies.component';

@NgModule({
  declarations: [
    CorporateSuppliesComponent
  ],
  exports: [
    CorporateSuppliesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CorporateSuppliesModule { }
