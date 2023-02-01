import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentRetrievalComponent } from './document-retrieval.component';

@NgModule({
  declarations: [
    DocumentRetrievalComponent
  ],
  exports: [
    DocumentRetrievalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DocumentRetrievalModule { }
