import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Components
import { FooterComponent } from './footer.component';


@NgModule({
  imports: [CommonModule],
  exports: [FooterComponent],
  declarations: [FooterComponent],
  providers: [],
})
export class FooterModule {
  /**
   * Creates an instance of FooterModule.
   * @memberof FooterModule
   */
  constructor() { }
}
