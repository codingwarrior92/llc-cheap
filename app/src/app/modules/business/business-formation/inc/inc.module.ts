import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncComponent } from './inc.component';



@NgModule({
  declarations: [
    IncComponent
  ],
  exports: [
    IncComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IncModule { }
