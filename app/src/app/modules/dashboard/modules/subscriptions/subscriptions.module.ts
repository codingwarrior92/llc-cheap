import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';



@NgModule({
  declarations: [
    SubscriptionsComponent
  ],
  exports: [
    SubscriptionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubscriptionsModule { }
