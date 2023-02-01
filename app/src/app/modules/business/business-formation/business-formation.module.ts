import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessFormationComponent } from './business-formation.component';
import { DbaModule } from './dba/dba.module';
import { EinFederalTaxIdentificationModule } from './ein-federal-tax-identification/ein-federal-tax-identification.module';
import { IncModule } from './inc/inc.module';
import { LlcModule } from './llc/llc.module';
import { NonprofitModule } from './nonprofit/nonprofit.module';
import { SoleProprietorshipModule } from './sole-proprietorship/sole-proprietorship.module';
import { StateTaxIdModule } from './state-tax-id/state-tax-id.module';
import { BusinessFormationRoutingModule } from './business-formation-routing.module';



@NgModule({
  declarations: [
    BusinessFormationComponent,
  ],
  exports: [
    BusinessFormationComponent
  ],
  imports: [
    CommonModule,
    DbaModule,
    EinFederalTaxIdentificationModule,
    IncModule,
    LlcModule,
    NonprofitModule,
    SoleProprietorshipModule,
    StateTaxIdModule,
    BusinessFormationRoutingModule
  ]
})
export class BusinessFormationModule { }
