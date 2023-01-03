import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// Components
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
})
export class HeaderModule {
  /**
   * Creates an instance of HeaderModule.
   * @memberof HeaderModule
   */
  constructor() {}
}
