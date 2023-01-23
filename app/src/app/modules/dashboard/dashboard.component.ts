import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _title: Title,) {
    this._title.setTitle("Dashboard - LLC Cheap");

  }

  ngOnInit(): void {
  }

}
