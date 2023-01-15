import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkSearchComponent } from './trademark-search.component';

describe('TrademarkSearchComponent', () => {
  let component: TrademarkSearchComponent;
  let fixture: ComponentFixture<TrademarkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrademarkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
