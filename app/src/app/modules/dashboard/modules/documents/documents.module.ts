import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';



@NgModule({
  declarations: [
    DocumentsComponent
  ],
  exports: [
    DocumentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DocumentsModule { }
