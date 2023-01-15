import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';

import { IntellectualPropertyModule } from './intellectual-property/intellectual-property.module';
import { BusinessFormationModule } from './business-formation/business-formation.module';
import { BusinessOperationsModule } from './business-operations/business-operations.module';



@NgModule({
  declarations: [
    BusinessComponent
  ],
  imports: [
    CommonModule,
    BusinessFormationModule,
    BusinessOperationsModule,
    IntellectualPropertyModule
  ]
})
export class BusinessModule { }
