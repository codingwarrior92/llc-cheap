import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressComponent} from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressComponent],
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create getClass', () => {
    component.data = {count: 2, previous: 1, current: .7};
    component.getClass();
    expect(component.data).toBeTruthy();
  });
});
