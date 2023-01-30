import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

// MODULES
import { DashboardFooterModule, DashboardHeaderModule, DashboardNavModule } from './shared';
import { CompaniesModule, ComplianceModule, DocumentsModule, OrdersModule, SettingsModule, SubscriptionsModule } from './modules';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardFooterModule,
    DashboardHeaderModule,
    DashboardNavModule,
    CompaniesModule,
    ComplianceModule,
    DocumentsModule,
    OrdersModule,
    SettingsModule,
    SubscriptionsModule
  ]
})
export class DashboardModule { }
