import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntellectualPropertyComponent } from './intellectual-property.component';

// MODULES
import { CopyrightRegistrationModule } from './copyright-registration/copyright-registration.module';
import { ProvisionalPatentModule } from './provisional-patent/provisional-patent.module';
import { TrademarkMonitoringModule } from './trademark-monitoring/trademark-monitoring.module';
import { TrademarkRegistrationModule } from './trademark-registration/trademark-registration.module';
import { TrademarkSearchModule } from './trademark-search/trademark-search.module';
import { UtilityPatentModule } from './utility-patent/utility-patent.module';

@NgModule({
  declarations: [
    IntellectualPropertyComponent,
  ],
  imports: [
    CommonModule,
    CopyrightRegistrationModule,
    ProvisionalPatentModule,
    TrademarkMonitoringModule,
    TrademarkRegistrationModule,
    TrademarkSearchModule,
    UtilityPatentModule
  ]
})
export class IntellectualPropertyModule { }
