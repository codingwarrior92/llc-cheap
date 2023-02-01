import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// COMPONENTS
import { BusinessFormationComponent } from "./business-formation.component";
import { DbaComponent } from "./dba/dba.component";
import { EinFederalTaxIdentificationComponent } from "./ein-federal-tax-identification/ein-federal-tax-identification.component";
import { IncComponent } from "./inc/inc.component";
import { LlcComponent } from "./llc/llc.component";
import { NonprofitComponent } from "./nonprofit/nonprofit.component";
import { SoleProprietorshipComponent } from "./sole-proprietorship/sole-proprietorship.component";
import { StateTaxIdComponent } from "./state-tax-id/state-tax-id.component";

const routes: Routes = [
  { path: '', component: BusinessFormationComponent },
  { path: 'dba', component: DbaComponent },
  { path: 'ein-federal-tax-identification', component: EinFederalTaxIdentificationComponent },
  { path: 'inc', component: IncComponent },
  { path: 'llc', component: LlcComponent },
  { path: 'non-profit', component: NonprofitComponent },
  { path: 'sole-proprietorship', component: SoleProprietorshipComponent },
  { path: 'state-tax-id', component: StateTaxIdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessFormationRoutingModule { }