import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RegisteredAgentComponent } from './registered-agent/registered-agent.component';



@NgModule({
  declarations: [
    ProductsComponent,
    RegisteredAgentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
