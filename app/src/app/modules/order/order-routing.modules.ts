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
    path: 'business/business-formation/partnership/order', component: OrderComponent,
    data: { type: 'business-formation', order: 'partnership' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-formation/registered-agent/new-entity/order', component: OrderComponent,
    data: { type: 'registered-agent', order: 'new-entity' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/registered-agent/change-agent/order', component: OrderComponent,
    data: { type: 'registered-agent', order: 'change-agent' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/registered-agent/bulk-change-agent/order', component: OrderComponent,
    data: { type: 'registered-agent', order: 'bulk-change-agent' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-formation/registered-agent/renewals/order', component: OrderComponent,
    data: { type: 'registered-agent', order: 'renewals' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/compliance/annual-report/order', component: OrderComponent,
    data: { type: 'compliance', order: 'annual-report' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/compliance/statement-information/order', component: OrderComponent,
    data: { type: 'compliance', order: 'statement-information' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/compliance/reinstatement/order', component: OrderComponent,
    data: { type: 'compliance', order: 'reinstatement' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/compliance/business-license-report/order', component: OrderComponent,
    data: { type: 'compliance', order: 'business-license-report' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/corporate-filings/dissolution/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'dissolution' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/amendment/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'amendment' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/conversion/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'conversion' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/merger/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'merger' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/publication-filing/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'publication-filing' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/foreign-qualification/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'foreign-qualification' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-filings/reinstatement/order', component: OrderComponent,
    data: { type: 'corporate-filings', order: 'reinstatement' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/document-retrieval/certificate-good-standing/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'certificate-good-standing' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/certified-copies/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'certified-copies' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/document-preparation/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'document-preparation' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'document-retrieval' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operationsdocument-retrieval/ammendment-documents/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'ammendment-documents' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operationsdocument-retrieval/certificate-status/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'certificate-status' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/formation-documents/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'formation-documents' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/amendment-documents/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'amendment-documents' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/annual-reports/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'annual-reports' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/dissolution-documents/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'dissolution-documents' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/documents-on-file/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'documents-on-file' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/certified-copy-formation/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'certified-copy-formation' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/apostille/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'apostille' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/ofac-patriot-act/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'ofac-patriot-act' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/document-retrieval/bankruptcy-claim/order', component: OrderComponent,
    data: { type: 'document-retrieval', order: 'bankruptcy-claim' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/ucc/revenue-clearance/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'revenue-clearance' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/information-search/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'information-search' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/search-retrieval/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'search-retrieval' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/tax-lien-state/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'tax-lien-state' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/filing/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'filing' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/search-state/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'search-state' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/copies/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'copies' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/litigation-search-county/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'litigation-search-county' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/search-copy-retrieval/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'search-copy-retrieval' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/tax-lein-federal/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'tax-lein-federal' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/fixture-filing/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'fixture-filing' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/pending-litigation-search-county/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'pending-litigation-search-county' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/fixture-search/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'fixture-search' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/dmv/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'dmv' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/court-search/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'court-search' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/ucc/document-retrieval/order', component: OrderComponent,
    data: { type: 'ucc-search-filing', order: 'document-retrieval' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/corporate-supplies/corporate-kits/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'corporate-kits' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-supplies/corporate-seals/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'corporate-seals' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-supplies/stock-certificates/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'stock-certificates' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-supplies/mermbership-certificates/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'mermbership-certificates' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-supplies/minutes-bylaws/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'minutes-bylaws' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/corporate-supplies/operating-agreement-banking-resolution/order', component: OrderComponent,
    data: { type: 'corporate-kits', order: 'operating-agreement-banking-resolution' },
    canActivate: [AuthGuardService]
  },

  {
    path: 'business/business-operations/additional-services/ein-federal-tax-identification/order', component: OrderComponent,
    data: { type: 'additional-services', order: 'ein' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'business/business-operations/additional-services/state-tax-id/order', component: OrderComponent,
    data: { type: 'additional-services', order: 'id' },
    canActivate: [AuthGuardService]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }