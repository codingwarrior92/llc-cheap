import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {SurveyService} from './survey.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
// import {HttpErrorResponse} from '@angular/common/http';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpMock: HttpTestingController;

  // const ID = 123;
  // const TYPE = 'sss';
  // const BUS = 'corp';
  const DATA:any = {
    error: {
      error: {
        errors: {
          name: 'message',
          message: 'this',
        },
      },
    },
    api: {
      sss: '',
    },
    Response: {},
    status: 400,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [SurveyService],
    }).compileComponents();
    service = TestBed.inject(SurveyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // it('should return undefined when get survey data', () => {
  //   let succeeded = false;
  //   let body: string | undefined;

  //   service.getSurvey(ID, BUS, TYPE).subscribe((response: any) => {
  //     succeeded = succeeded;
  //     body = response;
  //   });

  //   const REQ = httpMock.expectOne('assets/json/welcome.json');
  //   REQ.flush(
  //     {errors: []},
  //     new HttpErrorResponse({
  //       status: 503,
  //       statusText: 'Service Unavailable',
  //       url: 'assets/json/welcome.json',
  //     }),
  //   );
  //   expect(body).toBeUndefined();
  // });

  it('should use SurveyService', () => {
    expect(service).toBeTruthy();
  });

  it('_errorResponse be defined', () => {
    service._errorResponse(DATA.error.error.errors.message);
    expect(service._errorResponse).toBeTruthy();
  });

  it('_extractData be defined', () => {
    expect(function() {
      service._extractData(DATA);
    }).toThrow(new Error(DATA));
  });
});
