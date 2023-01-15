import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateNameChangeComponent } from './corporate-name-change.component';

describe('CorporateNameChangeComponent', () => {
  let component: CorporateNameChangeComponent;
  let fixture: ComponentFixture<CorporateNameChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateNameChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateNameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
