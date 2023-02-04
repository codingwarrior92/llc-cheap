import { EventEmitter, Injectable, } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { map, catchError, Observable, throwError, } from 'rxjs';

// INTERFACE
import { environment } from 'src/environments/environment';

@Injectable()
export class LegalIncService {
  accessToken = '';
  expiresIn = 0;
  refreshToken = '';
  headers = new HttpHeaders({ 'authorization': this.accessToken });
  options = { headers: this.headers };

  data: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of SurveyService.
   * @param {HttpClient} http
   * @memberof SurveyService
   */
  constructor(private _http: HttpClient) {
  }

  /**
   * @param {string} playlistId
   * @return {*}  {Observable<Survey>}
   * @memberof SurveyService
   */
  getBusinessName(term: string | null, entity: string | null, state: string | null): Observable<any> {
    const URL = environment.legalinc.api + 'name-check?entityName=' + term + '&entityType=' + entity + '&entityState=' + state;

    return this._http.get<Response>(URL, this.options).pipe(
      map(this._extractData),
      catchError((res: any) => this._handleError(res)),
    );
  }

  nameCheck(name: string, state: string, type: string): void {
    let eName = name;
    let eType = type;
    let eState = state;

    this._http.get(environment.legalinc.api + '/api/v2/entity/check', this.options).subscribe((res) => {

    });
  }

  getToken(): Observable<any> | null {
    return null;
  }

  /**
   * @private
   * @param {*} error
   * @return {*}  {Observable<any>}
   * @memberof SurveyService
   */
  _handleError(error: Error | any): Observable<any> {
    if (
      error instanceof HttpErrorResponse &&
      error.error instanceof Object &&
      error.error.errors &&
      error.error.errors instanceof Array
    ) {
      const ERRORS = this._errorResponse(error.error.errors[0]);
      return throwError(ERRORS);
    }

    return throwError(error);
  }

  /**
   * @private
   * @param {Response} res
   * @return {*}
   * @memberof SurveyService
   */
  _extractData(res: any) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res);
    }

    return res;
  }

  /**
   * @param {string} errors
   * @memberof SurveyService
   */
  _errorResponse(errors: string): void {
    if (errors !== undefined) {
      errors = errors;
    }
  }
}
