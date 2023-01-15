import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinFederalTaxIdentificationComponent } from './ein-federal-tax-identification.component';

describe('EinFederalTaxIdentificationComponent', () => {
  let component: EinFederalTaxIdentificationComponent;
  let fixture: ComponentFixture<EinFederalTaxIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EinFederalTaxIdentificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EinFederalTaxIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
