import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profile = false;
  user: any;
  business: any;

  constructor(public authService: AuthService) {
    this._isLoggedIn();
  }

  ngOnInit(): void {
  }

  private _isLoggedIn() {
    this.profile = this.authService.isAuthenticated();

    if (this.profile) {
      this.user = this.authService.userProfile;
    }
  }

}
