import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlcComponent } from './llc.component';

describe('LlcComponent', () => {
  let component: LlcComponent;
  let fixture: ComponentFixture<LlcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
