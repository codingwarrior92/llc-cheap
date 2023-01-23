import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';



@NgModule({
  declarations: [BusinessComponent],
  exports: [BusinessComponent],
  imports: [
    CommonModule
  ]
})
export class BusinessModule { }
