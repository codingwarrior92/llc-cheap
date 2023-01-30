import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProcessDetailComponent } from './detail.component';



@NgModule({
  declarations: [
    ServiceProcessDetailComponent
  ],
  exports: [
    ServiceProcessDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceProcessDetailModule { }
