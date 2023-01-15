import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkMonitoringComponent } from './trademark-monitoring.component';

describe('TrademarkMonitoringComponent', () => {
  let component: TrademarkMonitoringComponent;
  let fixture: ComponentFixture<TrademarkMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrademarkMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
