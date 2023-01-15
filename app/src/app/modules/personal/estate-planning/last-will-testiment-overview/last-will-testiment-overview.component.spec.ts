import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastWillTestimentComponent } from './last-will-testiment.component';

describe('LastWillTestimentComponent', () => {
  let component: LastWillTestimentComponent;
  let fixture: ComponentFixture<LastWillTestimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastWillTestimentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LastWillTestimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
