import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedUsersComponent } from './authorized-users.component';

describe('AuthorizedUsersComponent', () => {
  let component: AuthorizedUsersComponent;
  let fixture: ComponentFixture<AuthorizedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
