import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonprofitComponent } from './nonprofit.component';



@NgModule({
  declarations: [
    NonprofitComponent
  ],
  exports: [
    NonprofitComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NonprofitModule { }
