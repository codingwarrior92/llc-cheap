import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateFilingsComponent } from './corporate-filings.component';

describe('CorporateFilingsComponent', () => {
  let component: CorporateFilingsComponent;
  let fixture: ComponentFixture<CorporateFilingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateFilingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateFilingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
