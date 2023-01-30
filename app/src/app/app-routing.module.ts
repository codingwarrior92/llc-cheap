import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { NotFoundComponent } from './modules/404/notfound.component';
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
import { BusinessMainComponent } from './modules/business/business-main/business-main.component';
import { AnnualReportComponent } from './modules/business/business-operations/annual-report/annual-report.component';
import { BusinessAdvisoryPlanComponent } from './modules/business/business-operations/business-advisory-plan/business-advisory-plan.component';
import { BusinessOperationsComponent } from './modules/business/business-operations/business-operations.component';
import { CertificateGoodStandingComponent } from './modules/business/business-operations/certificate-good-standing/certificate-good-standing.component';
import { ComplianceCalendarComponent } from './modules/business/business-operations/compliance-calendar/compliance-calendar.component';
import { CorporateAmendmentComponent } from './modules/business/business-operations/corporate-amendment/corporate-amendment.component';
import { CorporateNameChangeComponent } from './modules/business/business-operations/corporate-name-change/corporate-name-change.component';
import { ForeignQualificationComponent } from './modules/business/business-operations/foreign-qualification/foreign-qualification.component';
import { MinutesManagerComponent } from './modules/business/business-operations/minutes-manager/minutes-manager.component';
import { RegisteredAgentComponent } from './modules/business/business-operations/registered-agent/registered-agent.component';
import { BusinessComponent } from './modules/business/business.component';
import { CopyrightRegistrationComponent } from './modules/business/intellectual-property/copyright-registration/copyright-registration.component';
import { IntellectualPropertyComponent } from './modules/business/intellectual-property/intellectual-property.component';
import { ProvisionalPatentComponent } from './modules/business/intellectual-property/provisional-patent/provisional-patent.component';
import { TrademarkRegistrationComponent } from './modules/business/intellectual-property/trademark-registration/trademark-registration.component';
import { TrademarkSearchComponent } from './modules/business/intellectual-property/trademark-search/trademark-search.component';
import { UtilityPatentComponent } from './modules/business/intellectual-property/utility-patent/utility-patent.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CompaniesComponent } from './modules/dashboard/modules/companies/companies.component';
import { ContactsComponent } from './modules/dashboard/modules/companies/detail/contacts/contacts.component';
import { DetailComponent } from './modules/dashboard/modules/companies/detail/detail.component';
import { ComplianceComponent } from './modules/dashboard/modules/compliance/compliance.component';
import { DocumentsComponent } from './modules/dashboard/modules/documents/documents.component';
import { MainDashboardComponent } from './modules/dashboard/modules/main/main.component';
import { OrdersComponent } from './modules/dashboard/modules/orders/orders.component';
import { ServiceProcessDetailComponent } from './modules/dashboard/modules/service-process/detail/detail.component';
import { ServiceProcessComponent } from './modules/dashboard/modules/service-process/service-process.component';
import { AuthorizedUsersComponent } from './modules/dashboard/modules/settings/authorized-users/authorized-users.component';
import { ManagePaymentsComponent } from './modules/dashboard/modules/settings/manage-payments/manage-payments.component';
import { PaymentHistoryComponent } from './modules/dashboard/modules/settings/payment-history/payment-history.component';
import { PersonalInfoComponent } from './modules/dashboard/modules/settings/personal-info/personal-info.component';
import { SettingsComponent } from './modules/dashboard/modules/settings/settings.component';
import { SubscriptionsComponent } from './modules/dashboard/modules/subscriptions/subscriptions.component';
import { HomeComponent } from './modules/home/home.component';
import { ServicesComponent } from './modules/home/services/services.component';
import { EstatePlanningComponent } from './modules/personal/estate-planning/estate-planning.component';
import { LastWillTestimentComponent } from './modules/personal/estate-planning/last-will-testiment/last-will-testiment.component';
import { LivingTrustComponent } from './modules/personal/estate-planning/living-trust/living-trust.component';
import { LivingWillComponent } from './modules/personal/estate-planning/living-will/living-will.component';
import { PowerAttorneyComponent } from './modules/personal/estate-planning/power-attorney/power-attorney.component';
import { FinancialPoaComponent } from './modules/personal/financial-poa/financial-poa.component';
import { MarriageDivorceComponent } from './modules/personal/marriage-divorce/marriage-divorce.component';
import { NameChangeComponent } from './modules/personal/name-change/name-change.component';
import { PersonalComponent } from './modules/personal/personal.component';
import { PropertyDeedTransferComponent } from './modules/personal/property-deed-transfer/property-deed-transfer.component';
import { RealEstateComponent } from './modules/personal/real-estate/real-estate.component';
import { ResidentialLeaseComponent } from './modules/personal/residential-lease/residential-lease.component';
import { CategoryComponent } from './modules/resources/cms/category/category.component';
import { CmsComponent } from './modules/resources/cms/cms.component';
import { MainComponent } from './modules/resources/cms/main/main.component';
import { PostComponent } from './modules/resources/cms/post/post.component';
import { SearchComponent } from './modules/resources/cms/search/search.component';
import { FormsComponent } from './shared/modules/forms/forms.component';

// SERVICES
import { AuthGuardService, LoggedInService } from './shared/services';
import { AuthAccountService } from './shared/services/guard/auth-account.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInService] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedInService] },
  {
    path: 'resources', component: CmsComponent,
    children: [
      { path: '', pathMatch: 'full', component: MainComponent },
      { path: 'search/:query', component: SearchComponent },
      { path: ':cat', component: CategoryComponent },
      { path: ':cat/:name', component: PostComponent },
    ]
  },
  {
    path: 'business', component: BusinessComponent, children: [
      { path: '', pathMatch: 'full', component: BusinessMainComponent },
      {
        path: 'business-formation', component: BusinessFormationComponent, children: [
          {
            path: 'dba', component: DbaComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-formation', order: 'dba' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'ein-federal-tax-identification', component: EinFederalTaxIdentificationComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'ein-retrieval', order: 'ein' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'inc', component: IncComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-formation', order: 'inc' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'llc', component: LlcComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-formation', order: 'llc' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'non-profit', component: NonprofitComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-formation', order: 'non-profit' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'sole-proprietorship', component: SoleProprietorshipComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-formation', order: 'sole-proprietorship' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'state-tax-id', component: StateTaxIdComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'ein-retrieval', order: 'id' },
                canActivate: [AuthGuardService]
              }
            ]
          }
        ]
      },
      {
        path: 'business-operations', component: BusinessOperationsComponent, children: [
          {
            path: 'annual-report', component: AnnualReportComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'annual-report' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'business-advisory-plan', component: BusinessAdvisoryPlanComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'business-advisory-plan' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'certificate-good-standing', component: CertificateGoodStandingComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'certificate-good-standing' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'compliance-calender', component: ComplianceCalendarComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'compliance-calendar' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'corporate-amendment', component: CorporateAmendmentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'corporate-amendment' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'corporate-name-change', component: CorporateNameChangeComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'corporate-name-change' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'foreign-qualification', component: ForeignQualificationComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'foreign-qualification' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'minutes-manager', component: MinutesManagerComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'minutes-manager' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'registered-agent', component: RegisteredAgentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { type: 'business-operations', order: 'registered-agent' },
                canActivate: [AuthGuardService]
              }
            ]
          },
        ]
      },
      {
        path: 'intellectual-property', component: IntellectualPropertyComponent, children: [
          {
            path: 'copyright-registration', component: CopyrightRegistrationComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'copyright-registration' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'provisional-patent', component: ProvisionalPatentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'provisional-patent' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'trademark-monitoring', component: ProvisionalPatentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'trademark-monitoring' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'trademark-registration', component: TrademarkRegistrationComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'trademark-registration' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'trademark-search', component: TrademarkSearchComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'trademark-search' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'utility-patent', component: UtilityPatentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'intellectual-property', 'order': 'utility-patent' },
                canActivate: [AuthGuardService]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'personal', component: PersonalComponent, children: [
      {
        path: 'estate-planning', component: EstatePlanningComponent,
        children: [
          {
            path: 'last-will-testiment', component: LastWillTestimentComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'estate-planning', 'order': 'last-will-testiment' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'living-trust', component: LivingTrustComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'estate-planning', 'order': 'living-trust' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'living-will', component: LivingWillComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'estate-planning', 'order': 'living-will' },
                canActivate: [AuthGuardService]
              }
            ]
          },
          {
            path: 'power-of-attorney', component: PowerAttorneyComponent, children: [
              {
                path: 'order', component: FormsComponent,
                data: { 'type': 'estate-planning', 'order': 'power-of-attorney' },
                canActivate: [AuthGuardService]
              }
            ]
          }
        ]
      },
      {
        path: 'marriage-or-divorce', component: MarriageDivorceComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'marriage-or-divorce' },
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'real-estate', component: RealEstateComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'real-estate' },
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'financial-power-of-attorey', component: FinancialPoaComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'financial-power-of-attorey' },
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'name-change', component: NameChangeComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'name-change' },
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'property-deed-transfer', component: PropertyDeedTransferComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'property-deed-transfer' },
            canActivate: [AuthGuardService]
          }
        ]
      },
      {
        path: 'residential-lease', component: ResidentialLeaseComponent, children: [
          {
            path: 'order', component: FormsComponent,
            data: { 'type': 'personal', 'order': 'residential-lease' },
            canActivate: [AuthGuardService]
          }
        ]
      }
    ]
  },
  {
    path: 'account', component: DashboardComponent, canActivate: [AuthAccountService],
    children: [
      { path: '', component: MainDashboardComponent },
      {
        path: 'settings', component: SettingsComponent,
        children: [
          { path: 'personal-info', component: PersonalInfoComponent },
          { path: 'manage-payments', component: ManagePaymentsComponent },
          { path: 'payment-history', component: PaymentHistoryComponent },
          { path: 'authorized-users', component: AuthorizedUsersComponent },
        ]
      },
      { path: 'subscriptions', component: SubscriptionsComponent },
      {
        path: 'companies', component: CompaniesComponent,
        children: [
          {
            path: ':id', component: DetailComponent,
            children: [
              { path: 'contacts', component: ContactsComponent },
              { path: 'documents', component: DocumentsComponent },
              { path: 'compliance', component: ComplianceComponent },
              { path: 'orders', component: OrdersComponent },
              { path: 'services', component: ServicesComponent },
              { path: 'subscriptions', component: SubscriptionsComponent }
            ]
          }
        ]
      },
      { path: 'compliance', component: ComplianceComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'orders', component: OrdersComponent },
      {
        path: 'service-process', component: ServiceProcessComponent,
        children: [
          { path: ':id', component: ServiceProcessDetailComponent }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
