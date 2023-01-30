import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentHistoryComponent } from './payment-history.component';



@NgModule({
  declarations: [
    PaymentHistoryComponent
  ],
  exports: [
    PaymentHistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentHistoryModule { }
