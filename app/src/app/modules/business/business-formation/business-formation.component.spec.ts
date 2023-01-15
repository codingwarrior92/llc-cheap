import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFormationComponent } from './business-formation.component';

describe('BusinessFormationComponent', () => {
  let component: BusinessFormationComponent;
  let fixture: ComponentFixture<BusinessFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
