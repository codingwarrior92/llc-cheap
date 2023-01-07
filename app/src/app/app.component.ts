import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'llc';

  constructor(private _meta: Meta) {
    this._meta.addTag({ name: 'REVISIT-AFTER', content: "1 DAYS" });
    this._meta.addTag({ name: 'RATING', content: "GENERAL" });
    this._meta.addTag({ name: 'RESOURCE-TYPE', content: "DOCUMENT" });
    this._meta.addTag({ name: 'generator', content: "html2" });
    this._meta.addTag({ name: 'ROBOTS', content: "index, follow" });
    this._meta.addTag({ name: 'robots', content: "noodp, noydir" });
  }
}
