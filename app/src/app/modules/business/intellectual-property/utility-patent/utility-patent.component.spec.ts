import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityPatentComponent } from './utility-patent.component';

describe('UtilityPatentComponent', () => {
  let component: UtilityPatentComponent;
  let fixture: ComponentFixture<UtilityPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilityPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
