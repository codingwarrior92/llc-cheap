import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

// Components
import {FooterComponent} from './footer.component';

// SERVICES
import {SurveyService} from '../../services/survey/survey.service';

@NgModule({
  imports: [CommonModule],
  exports: [FooterComponent],
  declarations: [FooterComponent],
  providers: [SurveyService],
})
export class FooterModule {
  /**
   * Creates an instance of FooterModule.
   * @memberof FooterModule
   */
  constructor() {}
}
