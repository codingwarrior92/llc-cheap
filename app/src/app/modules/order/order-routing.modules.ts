import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "src/app/shared/services";
import { OrderComponent } from "./order.component";

const routes: Routes = [
  {
    path: 'business/business-formation/llc/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'llc' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/inc/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'inc' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/ein-federal-tax-identification/order', component: OrderComponent,
    data: { type: 'ein-retrieval', order: 'ein' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/dba/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'dba' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/non-profit/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'non-profit' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/sole-proprietorship/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'sole-proprietorship' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/state-tax-id/order', component: OrderComponent,
    data: { type: 'ein-retrieval', order: 'id' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/annual-report/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'annual-report' },
    canActivate: [AuthGuardService]

  },
  {
    path: 'business/business-operations/business-advisory-plan/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'business-advisory-plan' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/certificate-good-standing/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'certificate-good-standing' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/compliance-calendar/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'compliance-calendar' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-amendment/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'corporate-amendment' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-name-change/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'corporate-name-change' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/foreign-qualification/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'foreign-qualification' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/minutes-manager/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'minutes-manager' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/registered-agent/order', component: OrderComponent,
    data: { type: 'business-operations', order: 'registered-agent' },
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }