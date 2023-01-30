import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePaymentsComponent } from './manage-payments.component';



@NgModule({
  declarations: [
    ManagePaymentsComponent
  ],
  exports: [
    ManagePaymentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ManagePaymentsModule { }
