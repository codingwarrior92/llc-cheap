import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { BusinessFormationComponent } from './modules/business/business-formation/business-formation.component';
import { BusinessOperationsComponent } from './modules/business/business-operations/business-operations.component';
import { BusinessComponent } from './modules/business/business.component';
import { IntellectualPropertyComponent } from './modules/business/intellectual-property/intellectual-property.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { EstatePlanningComponent } from './modules/personal/estate-planning/estate-planning.component';
import { MarriageDivorceComponent } from './modules/personal/marriage-divorce/marriage-divorce.component';
import { PersonalComponent } from './modules/personal/personal.component';
import { RealEstateComponent } from './modules/personal/real-estate/real-estate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'business', component: BusinessComponent, children: [
      { path: 'business-formation', component: BusinessFormationComponent },
      { path: 'business-operations', component: BusinessOperationsComponent },
      { path: 'intellectual-property', component: IntellectualPropertyComponent }
    ]
  },
  {
    path: 'personal', component: PersonalComponent, children: [
      { path: 'estate-planning', component: EstatePlanningComponent },
      { path: 'marriage-divorce', component: MarriageDivorceComponent },
      { path: 'real-estate', component: RealEstateComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
