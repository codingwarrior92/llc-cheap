import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies.component';



@NgModule({
  declarations: [
    CompaniesComponent
  ],
  exports: [
    CompaniesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompaniesModule { }
