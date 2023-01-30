import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProcessComponent } from './service-process.component';

describe('ServiceProcessComponent', () => {
  let component: ServiceProcessComponent;
  let fixture: ComponentFixture<ServiceProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
