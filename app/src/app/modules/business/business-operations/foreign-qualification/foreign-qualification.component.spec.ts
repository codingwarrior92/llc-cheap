import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignQualificationComponent } from './foreign-qualification.component';

describe('ForeignQualificationComponent', () => {
  let component: ForeignQualificationComponent;
  let fixture: ComponentFixture<ForeignQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForeignQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
