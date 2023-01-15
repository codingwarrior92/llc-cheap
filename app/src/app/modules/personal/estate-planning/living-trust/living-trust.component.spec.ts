import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingTrustComponent } from './living-trust.component';

describe('LivingTrustComponent', () => {
  let component: LivingTrustComponent;
  let fixture: ComponentFixture<LivingTrustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingTrustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivingTrustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
