import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesManagerComponent } from './minutes-manager.component';

describe('MinutesManagerComponent', () => {
  let component: MinutesManagerComponent;
  let fixture: ComponentFixture<MinutesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
