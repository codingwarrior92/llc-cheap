import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LegalIncService } from 'src/app/shared/services/legalinc.service';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingService } from 'src/app/shared/services/geocoding.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from './services/services.module';
import { SocialModule } from './social/social.module';
import { BusinessModule } from './business/business.module';
import { ResourcesModule } from './resources/resources.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    SocialModule,
    BusinessModule,
    ResourcesModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    LegalIncService,
    GeocodingService
  ]
})
export class HomeModule { }
