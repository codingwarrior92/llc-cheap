import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoComponent } from './personal-info.component';



@NgModule({
  declarations: [
    PersonalInfoComponent
  ],
  exports: [
    PersonalInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PersonalInfoModule { }
