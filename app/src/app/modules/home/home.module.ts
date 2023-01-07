import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BusinessNameService } from 'src/app/shared/services/survey/business.name.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    BusinessNameService
  ]
})
export class HomeModule { }
