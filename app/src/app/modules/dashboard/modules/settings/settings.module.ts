import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

// MODULES
import { AuthorizedUsersModule } from './authorized-users/authorized-users.module';
import { ManagePaymentsModule } from './manage-payments/manage-payments.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';
import { PersonalInfoModule } from './personal-info/personal-info.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  exports: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AuthorizedUsersModule,
    ManagePaymentsModule,
    PaymentHistoryModule,
    PersonalInfoModule
  ]
})
export class SettingsModule { }
