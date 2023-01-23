import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  social: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit(): void {
    this._loadsocial();
  }

  private _loadsocial() {
    this._http.get('./assets/json/reviews.json').subscribe((res) => {
      this.social = res;
    });
  };

}
