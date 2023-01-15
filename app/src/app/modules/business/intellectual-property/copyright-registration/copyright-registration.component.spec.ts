import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightRegistrationComponent } from './copyright-registration.component';

describe('CopyrightRegistrationComponent', () => {
  let component: CopyrightRegistrationComponent;
  let fixture: ComponentFixture<CopyrightRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyrightRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
