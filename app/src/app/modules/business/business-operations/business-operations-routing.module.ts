import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsComponent } from "src/app/shared/modules/forms/forms.component";
import { AuthGuardService } from "src/app/shared/services";
import { BusinessFormationComponent } from "../business-formation/business-formation.component";
import { AnnualReportComponent } from "./annual-report/annual-report.component";
import { BusinessAdvisoryPlanComponent } from "./business-advisory-plan/business-advisory-plan.component";
import { CertificateGoodStandingComponent } from "./certificate-good-standing/certificate-good-standing.component";
import { ComplianceCalendarComponent } from "./compliance-calendar/compliance-calendar.component";
import { CorporateAmendmentComponent } from "./corporate-amendment/corporate-amendment.component";
import { CorporateNameChangeComponent } from "./corporate-name-change/corporate-name-change.component";
import { ForeignQualificationComponent } from "./foreign-qualification/foreign-qualification.component";
import { MinutesManagerComponent } from "./minutes-manager/minutes-manager.component";
import { RegisteredAgentComponent } from "./registered-agent/registered-agent.component";

const routes = [
  { path: '', component: BusinessFormationComponent },
  { path: 'annual-report', component: AnnualReportComponent },
  { path: 'business-advisory-plan', component: BusinessAdvisoryPlanComponent },
  { path: 'certificate-good-standing', component: CertificateGoodStandingComponent },
  { path: 'compliance-calender', component: ComplianceCalendarComponent },
  { path: 'corporate-amendment', component: CorporateAmendmentComponent },
  { path: 'corporate-name-change', component: CorporateNameChangeComponent },
  { path: 'foreign-qualification', component: ForeignQualificationComponent },
  { path: 'minutes-manager', component: MinutesManagerComponent },
  { path: 'registered-agent', component: RegisteredAgentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessOperationsRoutingModule { }