import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingWillComponent } from './living-will.component';

describe('LivingWillComponent', () => {
  let component: LivingWillComponent;
  let fixture: ComponentFixture<LivingWillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivingWillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivingWillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
