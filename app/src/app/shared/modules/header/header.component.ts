import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';

// SERVICES
import { AuthService } from '../../services';

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
  constructor(public url: LocationStrategy, private _authService: AuthService) { }

  login() {
    return this._authService.isAuthenticated();
  }
}
