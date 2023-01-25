import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  route: string | undefined;
  breadcrumbList!: Array<any>;
  routeLinks: number | undefined;
  count: number | undefined;

  constructor(public location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
        this.breadcrumbList = this.route.split('/').filter((x) => x !== '');
        this.count = this.breadcrumbList.length;
      } else {
        this.route = 'Home';
      }
    });
  }

  ngOnInit() { }
}