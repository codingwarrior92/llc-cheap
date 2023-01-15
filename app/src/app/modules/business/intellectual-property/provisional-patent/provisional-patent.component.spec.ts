import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalPatentComponent } from './provisional-patent.component';

describe('ProvisionalPatentComponent', () => {
  let component: ProvisionalPatentComponent;
  let fixture: ComponentFixture<ProvisionalPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvisionalPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvisionalPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
