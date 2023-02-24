import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheInterceptor } from 'src/app/shared/interceptor/cache.interceptor';

// MODULES
import { ServicesModule } from './services/services.module';
import { SocialModule } from './social/social.module';
import { BusinessModule } from './business/business.module';
import { ResourcesModule } from './resources/resources.module';

// SERVICES
import { LegalIncService } from 'src/app/shared/services/external/legalinc.service';
import { GeocodingService } from 'src/app/shared/services/external/geocoding.service';

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
    ResourcesModule,
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    LegalIncService,
    GeocodingService
  ]
})
export class HomeModule { }
