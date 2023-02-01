import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.modules';
import { FormsModule } from 'src/app/shared/modules';
import { SummaryModule } from "../../shared/modules/forms/summary/summary.module";

@NgModule({
  declarations: [
    OrderComponent
  ],
  exports: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    SummaryModule
  ]
})
export class OrderModule { }
