import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDeedTransferComponent } from './property-deed-transfer.component';

describe('PropertyDeedTransferComponent', () => {
  let component: PropertyDeedTransferComponent;
  let fixture: ComponentFixture<PropertyDeedTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDeedTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDeedTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
