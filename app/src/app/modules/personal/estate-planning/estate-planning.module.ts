import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatePlanningComponent } from './estate-planning.component';
import { LastWillTestimentModule } from './last-will-testiment/last-will-testiment.module';
import { LivingTrustModule } from './living-trust/living-trust.module';
import { LivingWillModule } from './living-will/living-will.module';
import { PowerAttorneyModule } from './power-attorney/power-attorney.module';



@NgModule({
  declarations: [
    EstatePlanningComponent
  ],
  imports: [
    CommonModule,
    LastWillTestimentModule,
    LivingTrustModule,
    LivingWillModule,
    PowerAttorneyModule
  ]
})
export class EstatePlanningModule { }
