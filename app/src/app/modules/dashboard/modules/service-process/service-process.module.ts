import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProcessComponent } from './service-process.component';
import { ItemModule } from './item/item.module';
import { ServiceProcessDetailModule } from './detail/detail.module';



@NgModule({
  declarations: [
    ServiceProcessComponent
  ],
  imports: [
    CommonModule,
    ItemModule,
    ServiceProcessDetailModule
  ]
})
export class ServiceProcessModule { }
