import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';

// MODULES
import { EstatePlanningModule } from './estate-planning/estate-planning.module';
import { MarriageDivorceModule } from './marriage-divorce/marriage-divorce.module';
import { RealEstateModule } from './real-estate/real-estate.module';
import { FinancialPoaModule } from './financial-poa/financial-poa.module';
import { NameChangeModule } from './name-change/name-change.module';
import { PropertyDeedTransferModule } from './property-deed-transfer/property-deed-transfer.module';
import { ResidentialLeaseModule } from './residential-lease/residential-lease.module';

@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    CommonModule,
    EstatePlanningModule,
    MarriageDivorceModule,
    RealEstateModule,
    FinancialPoaModule,
    NameChangeModule,
    PropertyDeedTransferModule,
    ResidentialLeaseModule
  ]
})
export class PersonalModule { }
