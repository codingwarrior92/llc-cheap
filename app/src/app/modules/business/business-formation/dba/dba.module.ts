import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbaComponent } from './dba.component';



@NgModule({
  declarations: [
    DbaComponent
  ],
  exports: [
    DbaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DbaModule { }
