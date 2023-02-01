import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LlcComponent } from './llc.component';



@NgModule({
  declarations: [
    LlcComponent
  ],
  exports: [
    LlcComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LlcModule { }
