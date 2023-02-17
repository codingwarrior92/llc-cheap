import { DatePipe } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  date = new Date();
  isBrowser = false;
  /**
   * Creates an instance of FooterComponent.
   * @memberof FooterComponent
   */
  constructor(@Inject(PLATFORM_ID) private platform: any) {
    this.isBrowser  = isPlatformBrowser(this.platform);
  }

  scroll() {
    if (isPlatformBrowser(this.platform)) {
      window.scroll(0, 0);
    }
  }

}
