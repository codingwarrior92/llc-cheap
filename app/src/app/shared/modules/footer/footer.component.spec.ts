import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FooterComponent } from './footer.component';
import { SurveyService } from '../../services/external/legalinc.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FooterComponent],
      providers: [SurveyService],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Text Rendering - lock message', () => {
    const HTML = fixture.nativeElement as HTMLElement;
    // eslint-disable-next-line max-len
    component.text = 'Anywhere you see this lock, know your information is safe with us. We will never share your personal information outside Playlist!';
    fixture.detectChanges();
    expect(HTML.querySelector('.footer_lock span')?.textContent).toContain(
      component.text,
    );
  });

  it('Text Rendering- copyright message', () => {
    const HTML = fixture.nativeElement as HTMLElement;
    expect(HTML.querySelector('.footer_copyright')?.textContent).toContain(
      // eslint-disable-next-line max-len
      '2021 PNC Financial Services Group Inc. All Rights Reserved',
    );
  });

  it('IMG Rendering - lock', () => {
    const ELEMENT = fixture.debugElement.nativeElement;
    component.text = 'test';

    fixture.detectChanges();
    expect(ELEMENT.querySelector('.footer_lock img').src).toContain(
      'assets/svg/lock.svg',
    );
  });
});
