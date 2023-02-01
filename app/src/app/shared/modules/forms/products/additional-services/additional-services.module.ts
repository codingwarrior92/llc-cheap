import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalServicesComponent } from './additional-services.component';

@NgModule({
  declarations: [
    AdditionalServicesComponent
  ],
  exports: [
    AdditionalServicesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdditionalServicesModule { }
