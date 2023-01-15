import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessOperationsComponent } from './business-operations.component';
import { BusinessAdvisoryPlanModule } from './business-advisory-plan/business-advisory-plan.module';
import { CertificateGoodStandingModule } from './certificate-good-standing/certificate-good-standing.module';
import { ComplianceCalendarModule } from './compliance-calendar/compliance-calendar-overview.module';
import { CorporateNameChangeModule } from './corporate-name-change/corporate-name-change.module';
import { ForeignQualificationModule } from './foreign-qualification/foreign-qualification.module';
import { MinutesManagerModule } from './minutes-manager/minutes-manager.module';
import { RegisteredAgentModule } from './registered-agent/registered-agent-overview.module';


@NgModule({
  declarations: [
    BusinessOperationsComponent
  ],
  imports: [
    CommonModule,
    BusinessAdvisoryPlanModule,
    CertificateGoodStandingModule,
    ComplianceCalendarModule,
    CorporateNameChangeModule,
    ForeignQualificationModule,
    MinutesManagerModule,
    RegisteredAgentModule
  ]
})
export class BusinessOperationsModule { }
