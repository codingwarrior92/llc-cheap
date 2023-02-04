import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { stateList, entities, productSelection } from '../../../../other/constants';

@Component({
  selector: 'app-company-formation',
  templateUrl: './company-formation.component.html',
  styleUrls: ['./company-formation.component.scss']
})
export class CompanyFormationComponent implements OnInit {
  @Output() form = new EventEmitter();

  states = stateList;
  entities = entities;
  products = productSelection;

  company = new FormGroup({
    states: new FormControl('', [Validators.required]),
    entities: new FormControl('', [Validators.required]),
    products: this._formBuilder.array([]),
    processingTime: new FormControl('')
  });

  constructor(private _formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

}
