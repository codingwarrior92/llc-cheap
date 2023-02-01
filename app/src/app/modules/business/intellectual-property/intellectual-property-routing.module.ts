import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsComponent } from "src/app/shared/modules/forms/forms.component";
import { AuthGuardService } from "src/app/shared/services";
import { CopyrightRegistrationComponent } from "./copyright-registration/copyright-registration.component";
import { IntellectualPropertyComponent } from "./intellectual-property.component";
import { ProvisionalPatentComponent } from "./provisional-patent/provisional-patent.component";
import { TrademarkRegistrationComponent } from "./trademark-registration/trademark-registration.component";
import { TrademarkSearchComponent } from "./trademark-search/trademark-search.component";
import { UtilityPatentComponent } from "./utility-patent/utility-patent.component";

const routes: Routes = [
  { path: '', component: IntellectualPropertyComponent },
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

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntellectualPropertyRoutingModule { }