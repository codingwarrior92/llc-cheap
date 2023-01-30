import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { ItemComponent } from './item/item.component';
import { ItemModule } from './item/item.module';



@NgModule({
  declarations: [
    OrdersComponent,
  ],
  exports: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ItemModule
  ]
})
export class OrdersModule { }
