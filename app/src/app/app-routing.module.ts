import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { BusinessFormationComponent } from './modules/business/business-formation/business-formation.component';
import { DbaComponent } from './modules/business/business-formation/dba/dba.component';
import { EinFederalTaxIdentificationComponent } from './modules/business/business-formation/ein-federal-tax-identification/ein-federal-tax-identification.component';
import { IncComponent } from './modules/business/business-formation/inc/inc.component';
import { LlcComponent } from './modules/business/business-formation/llc/llc.component';
import { NonprofitComponent } from './modules/business/business-formation/nonprofit/nonprofit.component';
import { SoleProprietorshipComponent } from './modules/business/business-formation/sole-proprietorship/sole-proprietorship.component';
import { StateTaxIdComponent } from './modules/business/business-formation/state-tax-id/state-tax-id.component';
import { AnnualReportComponent } from './modules/business/business-operations/annual-report/annual-report-overview.component';
import { BusinessAdvisoryPlanComponent } from './modules/business/business-operations/business-advisory-plan/business-advisory-plan.component';
import { BusinessOperationsComponent } from './modules/business/business-operations/business-operations.component';
import { CertificateGoodStandingComponent } from './modules/business/business-operations/certificate-good-standing/certificate-good-standing.component';
import { ComplianceCalendarComponent } from './modules/business/business-operations/compliance-calendar/compliance-calendar-overview.component';
import { CorporateNameChangeComponent } from './modules/business/business-operations/corporate-name-change/corporate-name-change.component';
import { ForeignQualificationComponent } from './modules/business/business-operations/foreign-qualification/foreign-qualification.component';
import { MinutesManagerComponent } from './modules/business/business-operations/minutes-manager/minutes-manager.component';
import { RegisteredAgentComponent } from './modules/business/business-operations/registered-agent/registered-agent-overview.component';
import { BusinessComponent } from './modules/business/business.component';
import { CopyrightRegistrationComponent } from './modules/business/intellectual-property/copyright-registration/copyright-registration.component';
import { IntellectualPropertyComponent } from './modules/business/intellectual-property/intellectual-property.component';
import { ProvisionalPatentComponent } from './modules/business/intellectual-property/provisional-patent/provisional-patent.component';
import { TrademarkRegistrationComponent } from './modules/business/intellectual-property/trademark-registration/trademark-registration.component';
import { TrademarkSearchComponent } from './modules/business/intellectual-property/trademark-search/trademark-search.component';
import { UtilityPatentComponent } from './modules/business/intellectual-property/utility-patent/utility-patent.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { EstatePlanningComponent } from './modules/personal/estate-planning/estate-planning.component';
import { FinancialPoaComponent } from './modules/personal/financial-poa/financial-poa.component';
import { MarriageDivorceComponent } from './modules/personal/marriage-divorce/marriage-divorce.component';
import { NameChangeComponent } from './modules/personal/name-change/name-change.component';
import { PersonalComponent } from './modules/personal/personal.component';
import { PropertyDeedTransferComponent } from './modules/personal/property-deed-transfer/property-deed-transfer.component';
import { RealEstateComponent } from './modules/personal/real-estate/real-estate.component';
import { ResidentialLeaseComponent } from './modules/personal/residential-lease/residential-lease.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'business', component: BusinessComponent, children: [
      {
        path: 'business-formation', component: BusinessFormationComponent, children: [
          { path: 'dba-overview', component: DbaComponent },
          { path: 'ein-federal-tax-identification-overview', component: EinFederalTaxIdentificationComponent },
          { path: 'inc-overview', component: IncComponent },
          { path: 'llc-overview', component: LlcComponent },
          { path: 'nonprofit-overview', component: NonprofitComponent },
          { path: 'sole-proprietorship', component: SoleProprietorshipComponent },
          { path: 'state-tax-id-overview', component: StateTaxIdComponent }
        ]
      },
      {
        path: 'business-operations', component: BusinessOperationsComponent, children: [
          { path: 'annual-report-overview', component: AnnualReportComponent },
          { path: 'business-advisory-plan-overview', component: BusinessAdvisoryPlanComponent },
          { path: 'certificate-good-standing-overview', component: CertificateGoodStandingComponent },
          { path: 'compliance-calender', component: ComplianceCalendarComponent },
          { path: 'corporate-name-change', component: CorporateNameChangeComponent },
          { path: 'foreign-qualification', component: ForeignQualificationComponent },
          { path: 'minutes-manager', component: MinutesManagerComponent },
          { path: 'registered-agent', component: RegisteredAgentComponent }
        ]
      },
      {
        path: 'intellectual-property', component: IntellectualPropertyComponent, children: [
          { path: 'copyright-registration', component: CopyrightRegistrationComponent },
          { path: 'provisional-patent', component: ProvisionalPatentComponent },
          { path: 'trademark-monitoring', component: ProvisionalPatentComponent },
          { path: 'trademark-registration', component: TrademarkRegistrationComponent },
          { path: 'trademark-search', component: TrademarkSearchComponent },
          { path: 'utility-patent', component: UtilityPatentComponent }
        ]
      }
    ]
  },
  {
    path: 'personal', component: PersonalComponent, children: [
      { path: 'estate-planning', component: EstatePlanningComponent },
      { path: 'marriage-or-divorce', component: MarriageDivorceComponent },
      { path: 'real-estate', component: RealEstateComponent },
      { path: 'financial-power-of-attorey', component: FinancialPoaComponent },
      { path: 'name-change', component: NameChangeComponent },
      { path: 'property-deed-transfer', component: PropertyDeedTransferComponent },
      { path: 'residential-lease', component: ResidentialLeaseComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
