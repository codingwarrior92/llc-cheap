import {CommonModule} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('IMG Rendering - back', () => {
    const COMPILED = fixture.debugElement.nativeElement;
    expect(COMPILED.querySelector('.header_container--back img').src).toContain('assets/svg/back.svg');
  });

  it('IMG Rendering - logo', () => {
    const COMPILED = fixture.debugElement.nativeElement;
    expect(COMPILED.querySelector('.header_container--logos img[alt~="PNC"]').src).toContain('assets/svg/logo.svg');
  });

  it('IMG Rendering - playlist', () => {
    const COMPILED = fixture.debugElement.nativeElement;
    // eslint-disable-next-line max-len
    expect(COMPILED.querySelector('.header_container--logos img[alt~="Playlist"]').src).toContain('assets/svg/playlist-logo.svg');
  });
});
