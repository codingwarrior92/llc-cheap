import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() data: any;
  @Output() form = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  fieldData(data: any) {
    this.form.emit(data);
  }

}
