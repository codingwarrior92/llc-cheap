import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSuppliesComponent } from './corporate-supplies.component';

describe('CorporateSuppliesComponent', () => {
  let component: CorporateSuppliesComponent;
  let fixture: ComponentFixture<CorporateSuppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateSuppliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
