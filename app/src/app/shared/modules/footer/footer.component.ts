import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  date = new Date();
  /**
   * Creates an instance of FooterComponent.
   * @memberof FooterComponent
   */
  constructor() {
  }

  scroll() {
    window.scroll(0, 0);
  }

}
