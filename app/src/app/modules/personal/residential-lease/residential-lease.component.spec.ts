import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialLeaseComponent } from './residential-lease.component';

describe('ResidentialLeaseComponent', () => {
  let component: ResidentialLeaseComponent;
  let fixture: ComponentFixture<ResidentialLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialLeaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
