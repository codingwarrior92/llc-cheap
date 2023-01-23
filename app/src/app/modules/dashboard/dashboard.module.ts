import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardFooterModule } from './footer/footer.module';
import { DashboardHeaderModule } from './header/header.module';
import { DashboardNavModule } from './nav/nav.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardFooterModule,
    DashboardHeaderModule,
    DashboardNavModule
  ]
})
export class DashboardModule { }
