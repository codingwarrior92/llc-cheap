import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRetrievalComponent } from './document-retrieval.component';

describe('DocumentRetrievalComponent', () => {
  let component: DocumentRetrievalComponent;
  let fixture: ComponentFixture<DocumentRetrievalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentRetrievalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
