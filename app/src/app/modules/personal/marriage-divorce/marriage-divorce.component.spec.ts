import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageDivorceComponent } from './marriage-divorce.component';

describe('MarriageDivorceComponent', () => {
  let component: MarriageDivorceComponent;
  let fixture: ComponentFixture<MarriageDivorceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriageDivorceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageDivorceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
