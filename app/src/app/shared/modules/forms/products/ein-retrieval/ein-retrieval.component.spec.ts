import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinRetrievalComponent } from './ein-retrieval.component';

describe('EinRetrievalComponent', () => {
  let component: EinRetrievalComponent;
  let fixture: ComponentFixture<EinRetrievalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EinRetrievalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EinRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
