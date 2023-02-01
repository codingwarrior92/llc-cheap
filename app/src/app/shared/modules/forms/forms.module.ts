import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';

// MODULES
import { SummaryModule } from './summary/summary.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [
    FormsComponent
  ],
  exports: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    SummaryModule,
    ProductsModule
  ]
})
export class FormsModule { }
