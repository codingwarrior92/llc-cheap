import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';



@NgModule({
  declarations: [
    ItemComponent
  ],
  exports: [
    ItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ItemModule { }
