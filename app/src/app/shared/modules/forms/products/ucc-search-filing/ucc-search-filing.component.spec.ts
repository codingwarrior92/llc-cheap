import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UccSearchFilingComponent } from './ucc-search-filing.component';

describe('UccSearchFilingComponent', () => {
  let component: UccSearchFilingComponent;
  let fixture: ComponentFixture<UccSearchFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UccSearchFilingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UccSearchFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
