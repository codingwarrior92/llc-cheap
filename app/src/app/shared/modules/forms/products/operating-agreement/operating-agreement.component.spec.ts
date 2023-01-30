import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingAgreementComponent } from './operating-agreement.component';

describe('OperatingAgreementComponent', () => {
  let component: OperatingAgreementComponent;
  let fixture: ComponentFixture<OperatingAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatingAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
