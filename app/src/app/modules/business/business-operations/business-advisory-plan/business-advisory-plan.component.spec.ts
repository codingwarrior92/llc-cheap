import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAdvisoryPlanComponent } from './business-advisory-plan.component';

describe('BusinessAdvisoryPlanComponent', () => {
  let component: BusinessAdvisoryPlanComponent;
  let fixture: ComponentFixture<BusinessAdvisoryPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAdvisoryPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAdvisoryPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
