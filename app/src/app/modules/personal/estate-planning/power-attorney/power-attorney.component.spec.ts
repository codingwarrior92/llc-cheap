import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerAttorneyComponent } from './power-attorney.component';

describe('PowerAttorneyComponent', () => {
  let component: PowerAttorneyComponent;
  let fixture: ComponentFixture<PowerAttorneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerAttorneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerAttorneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
