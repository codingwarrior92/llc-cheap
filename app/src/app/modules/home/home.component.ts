import { Component, OnInit } from '@angular/core';

// SERVICES
import { BusinessNameService } from 'src/app/shared/services/survey/business.name.service';

// SOCIAL
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _business: BusinessNameService, private _meta: Meta, private _title: Title) {
    this._title.setTitle("LLC Cheap - Grow and start your business Today");
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
    // this._business.getBusinessName('test', 'ca').subscribe((res) => {
    //   console.log(res);
    // })
  }

}
