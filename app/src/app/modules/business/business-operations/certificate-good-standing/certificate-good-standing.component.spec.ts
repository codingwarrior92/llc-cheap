import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateGoodStandingComponent } from './certificate-good-standing.component';

describe('CertificateGoodStandingComponent', () => {
  let component: CertificateGoodStandingComponent;
  let fixture: ComponentFixture<CertificateGoodStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateGoodStandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateGoodStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
