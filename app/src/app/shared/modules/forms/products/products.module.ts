import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';

// MODULES
import { CompanyFormationModule } from './company-formation/company-formation.module';
import { CorporateSuppliesModule } from './corporate-supplies/corporate-supplies.module';
import { DocumentRetrievalModule } from './document-retrieval/document-retrieval.module';
import { RegisteredAgentModule } from './registered-agent/registered-agent.module';
import { ComplianceModule } from './compliance/compliance.module';
import { UccSearchFilingModule } from './ucc-search-filing/ucc-search-filing.module';
import { CorporateFilingsModule } from './corporate-filings/corporate-filings.module';
import { AdditionalServicesModule } from './additional-services/additional-services.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  exports: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    CompanyFormationModule,
    CorporateSuppliesModule,
    DocumentRetrievalModule,
    RegisteredAgentModule,
    ComplianceModule,
    UccSearchFilingModule,
    CorporateFilingsModule,
    AdditionalServicesModule
  ]
})
export class ProductsModule { }
