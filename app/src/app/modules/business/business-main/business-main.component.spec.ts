import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessMainComponent } from './business-main.component';

describe('BusinessMainComponent', () => {
  let component: BusinessMainComponent;
  let fixture: ComponentFixture<BusinessMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
