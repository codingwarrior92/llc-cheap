import { Component } from '@angular/core';

// SERVICES
import { BusinessNameService } from 'src/app/shared/services/business.name.service';
import { GeocodingService } from 'src/app/shared/services/geocoding.service';

// SOCIAL
import { Meta, Title } from '@angular/platform-browser';

// RXJS
import { lastValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  search = new FormGroup({
    input: new FormControl(''),
    select: new FormControl('', [Validators.required]),
  });

  stateList = [
    { appr: "AK", name: "Alaska" },
    { appr: "AL", name: "Alabama" },
    { appr: "AR", name: "Arkansas" },
    { appr: "AS", name: "American Samoa" },
    { appr: "AZ", name: "Arizona" },
    { appr: "CA", name: "California" },
    { appr: "CO", name: "Colorado" },
    { appr: "CT", name: "Connecticut" },
    { appr: "DC", name: "District of Columbia" },
    { appr: "DE", name: "Delaware" },
    { appr: "FL", name: "Florida" },
    { appr: "GA", name: "Georgia" },
    { appr: "GU", name: "Guam" },
    { appr: "HI", name: "Hawaii" },
    { appr: "IA", name: "Iowa" },
    { appr: "ID", name: "Idaho" },
    { appr: "IL", name: "Illinois" },
    { appr: "IN", name: "Indiana" },
    { appr: "KS", name: "Kansas" },
    { appr: "KY", name: "Kentucky" },
    { appr: "LA", name: "Louisiana" },
    { appr: "MA", name: "Massachusetts" },
    { appr: "MD", name: "Maryland" },
    { appr: "ME", name: "Maine" },
    { appr: "MI", name: "Michigan" },
    { appr: "MN", name: "Minnesota" },
    { appr: "MO", name: "Missouri" },
    { appr: "MS", name: "Mississippi" },
    { appr: "MT", name: "Montana" },
    { appr: "NC", name: "North Carolina" },
    { appr: "ND", name: "North Dakota" },
    { appr: "NE", name: "Nebraska" },
    { appr: "NH", name: "New Hampshire" },
    { appr: "NJ", name: "New Jersey" },
    { appr: "NM", name: "New Mexico" },
    { appr: "NV", name: "Nevada" },
    { appr: "NY", name: "New York" },
    { appr: "OH", name: "Ohio" },
    { appr: "OK", name: "Oklahoma" },
    { appr: "OR", name: "Oregon" },
    { appr: "PA", name: "Pennsylvania" },
    { appr: "PR", name: "Puerto Rico" },
    { appr: "RI", name: "Rhode Island" },
    { appr: "SC", name: "South Carolina" },
    { appr: "SD", name: "South Dakota" },
    { appr: "TN", name: "Tennessee" },
    { appr: "TX", name: "Texas" },
    { appr: "UT", name: "Utah" },
    { appr: "VA", name: "Virginia" },
    { appr: "VI", name: "Virgin Islands" },
    { appr: "VT", name: "Vermont" },
    { appr: "WA", name: "Washington" },
    { appr: "WI", name: "Wisconsin" },
    { appr: "WV", name: "West Virginia" },
    { appr: "WY", name: "Wyoming" }
  ]

  constructor(private _business: BusinessNameService, private _meta: Meta, private _title: Title, private _geolocation: GeocodingService) {
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
                this.search.controls.select.setValue(y.appr);
              }
            });
          });
        })
      });
    }
  }


  searchEntity() {
    // this._business.getBusinessName(this.search.controls.input.value, this.search.controls.select.value).subscribe((res) => {
    //   console.log(res);
    // })
  }
}
