import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceComponent } from './compliance.component';



@NgModule({
  declarations: [
    ComplianceComponent
  ],
  exports: [
    ComplianceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComplianceModule { }
