import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  type: string = '';
  order: string = '';

  constructor(private _title: Title, private _activatedRoute: ActivatedRoute) {
    this.getTitle();
  }

  ngOnInit(): void {
  }

  getTitle() {
    this._activatedRoute.data.subscribe((res) => {
      this.type = this._capitalizeString(res['type'].split('-').join(' '));
      this.order = res['order'].toUpperCase();

      this._title.setTitle(`${this.type} of a ${this.order} - LLC Cheap`);

    })
  }

  private _capitalizeString = (str: string) => {
    let words = str.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  }
}
