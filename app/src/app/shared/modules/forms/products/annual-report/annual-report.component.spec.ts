import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReportComponent } from './annual-report.component';

describe('AnnualReportComponent', () => {
  let component: AnnualReportComponent;
  let fixture: ComponentFixture<AnnualReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
