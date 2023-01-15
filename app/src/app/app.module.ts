import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// STRIPE
import { NgxStripeModule } from 'ngx-stripe';

// FIREBASE
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/compat/performance';

// MODULES
import { HomeModule } from './modules';
import { HeaderModule } from './shared/modules/header/header.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { BusinessModule } from './modules/business/business.module';
import { PersonalModule } from './modules/personal/personal.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'llc-cheap' }),
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    BusinessModule,
    PersonalModule,
    DashboardModule,
    NgxStripeModule.forRoot(environment.stripe),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule
  ],
  providers: [
    PerformanceMonitoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
