import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { SummaryModule } from './summary/summary.module';



@NgModule({
  declarations: [
    FormsComponent
  ],
  exports: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    SummaryModule
  ]
})
export class FormsModule { }
