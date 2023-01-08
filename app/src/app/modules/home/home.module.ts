import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BusinessNameService } from 'src/app/shared/services/business.name.service';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingService } from 'src/app/shared/services/geocoding.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    BusinessNameService,
    GeocodingService
  ]
})
export class HomeModule { }
