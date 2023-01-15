import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTaxIdComponent } from './state-tax-id.component';

describe('StateTaxIdComponent', () => {
  let component: StateTaxIdComponent;
  let fixture: ComponentFixture<StateTaxIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateTaxIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateTaxIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
