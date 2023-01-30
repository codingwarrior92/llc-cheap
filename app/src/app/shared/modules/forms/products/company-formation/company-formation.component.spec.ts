import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormationComponent } from './company-formation.component';

describe('CompanyFormationComponent', () => {
  let component: CompanyFormationComponent;
  let fixture: ComponentFixture<CompanyFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
