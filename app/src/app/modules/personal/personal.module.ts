import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { EstatePlanningModule } from './estate-planning/estate-planning.module';
import { MarriageDivorceModule } from './marriage-divorce/marriage-divorce.module';
import { RealEstateModule } from './real-estate/real-estate.module';



@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    CommonModule,
    EstatePlanningModule,
    MarriageDivorceModule,
    RealEstateModule
  ]
})
export class PersonalModule { }
