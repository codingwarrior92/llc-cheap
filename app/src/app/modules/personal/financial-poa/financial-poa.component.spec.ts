import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPoaComponent } from './financial-poa.component';

describe('FinancialPoaComponent', () => {
  let component: FinancialPoaComponent;
  let fixture: ComponentFixture<FinancialPoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
