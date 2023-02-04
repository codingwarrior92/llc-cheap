import { Component } from '@angular/core';

// SERVICES
import { LegalIncService } from 'src/app/shared/services/external/legalinc.service';
import { GeocodingService } from 'src/app/shared/services/external/geocoding.service';

// SOCIAL
import { Meta, Title } from '@angular/platform-browser';

// RXJS
import { lastValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { stateList, entities } from 'src/app/shared/other/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  search = new FormGroup({
    text: new FormControl('', [Validators.required]),
    entity: new FormControl('LLC', [Validators.required]),
    state: new FormControl('', [Validators.required]),
  });

  stateList = stateList;
  typeList = entities;

  constructor(private _legalService: LegalIncService, private _meta: Meta, private _title: Title, private _geolocation: GeocodingService) {
    this._title.setTitle("LLC Cheap - Grow or start your business today!");
    this._meta.updateTag({ name: 'description', content: "LegalZoom is the nation's leading provider of personalized, online legal solutions and legal documents for small businesses and families. Form an LLC, incorporate a business, make a will, register a trademark, get legal advice, and more online." });

    this._meta.addTag({ name: 'og:title', content: "LegalZoom: Start a Business, Protect Your Family: LLC, Incorporate, Wills, Trademark, Legal Advice" });
    this._meta.addTag({ name: 'og:type', content: "company" });
    this._meta.addTag({ name: 'og:url', content: "llc.cheap" });
    this._meta.addTag({ name: 'og:image', content: "https://www.legalzoom.com/resources/img/lzr/global/legalzoom-20-og.png" });
    this._meta.addTag({ name: 'og:site_name', content: "LLC Cheap" });
    this._meta.addTag({ name: 'og:description', content: "LegalZoom: Start a Business, Protect Your Family: LLC, Incorporate, Wills, Trademark, Legal Advice" });
    this._meta.addTag({ name: 'twitter:card', content: "summary" });
    this._meta.addTag({ name: 'twitter:site', content: "@llcheap" });
    this._meta.addTag({ name: 'twitter:title', content: "LegalZoom: Start a Business, Protect Your Family: LLC, Incorporate, Wills, Trademark, Legal Advice" });
    this._meta.addTag({ name: 'twitter:description', content: "LegalZoom: Start a Business, Protect Your Family: LLC, Incorporate, Wills, Trademark, Legal Advice" });
    this._meta.addTag({ name: 'twitter:image', content: "https://www.legalzoom.com/resources/img/lzr/global/legalzoom-20-og.png" });
    this._meta.addTag({ name: 'twitter:image:alt', content: "LLC Cheap" });
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        lastValueFrom(this._geolocation.getState(position.coords.latitude, position.coords.longitude)).then((res) => {
          console.log(res);
          let a = res.results.find((x: any) => x.formatted_address);
          a = a.formatted_address.split(' ');
          this.stateList.filter(y => {
            a.filter((x: string) => {
              if (y.appr === x) {
                this.search.controls.state.setValue(y.appr);
              }
            });
          });
        })
      });
    }
  }


}
