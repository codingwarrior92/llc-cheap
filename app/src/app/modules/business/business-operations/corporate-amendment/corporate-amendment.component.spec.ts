import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAmendmentComponent } from './corporate-amendment.component';

describe('CorporateAmendmentComponent', () => {
  let component: CorporateAmendmentComponent;
  let fixture: ComponentFixture<CorporateAmendmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateAmendmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateAmendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
