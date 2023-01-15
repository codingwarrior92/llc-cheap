import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkRegistrationComponent } from './trademark-registration.component';

describe('TrademarkRegistrationComponent', () => {
  let component: TrademarkRegistrationComponent;
  let fixture: ComponentFixture<TrademarkRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrademarkRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
