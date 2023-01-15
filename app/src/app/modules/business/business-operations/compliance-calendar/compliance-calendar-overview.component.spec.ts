import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceCalendarComponent } from './compliance-calendar.component';

describe('ComplianceCalendarComponent', () => {
  let component: ComplianceCalendarComponent;
  let fixture: ComponentFixture<ComplianceCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplianceCalendarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComplianceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
