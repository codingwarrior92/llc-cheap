import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * Creates an instance of HeaderComponent.
   * @memberof HeaderComponent
   */
  constructor(public url: LocationStrategy) { }
}
