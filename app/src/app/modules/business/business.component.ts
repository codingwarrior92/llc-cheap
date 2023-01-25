import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  constructor(private _title: Title) {
    this._title.setTitle("Start a Business - LLC Cheap");
  }


  ngOnInit(): void {
  }

}
