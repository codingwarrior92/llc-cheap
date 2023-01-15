import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoleProprietorshipComponent } from './sole-proprietorship.component';

describe('SoleProprietorshipComponent', () => {
  let component: SoleProprietorshipComponent;
  let fixture: ComponentFixture<SoleProprietorshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoleProprietorshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoleProprietorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
