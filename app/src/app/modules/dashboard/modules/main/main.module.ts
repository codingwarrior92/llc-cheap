import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main.component';



@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  exports: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
