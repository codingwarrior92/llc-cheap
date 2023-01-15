import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAgentComponent } from './registered-agent.component';

describe('RegisteredAgentComponent', () => {
  let component: RegisteredAgentComponent;
  let fixture: ComponentFixture<RegisteredAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
