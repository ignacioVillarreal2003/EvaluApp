import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ISurvey } from './ISurvey';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';  
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }


  checkPin(pin: string): Observable<any> {
    const requestBody: any = {
      pin: pin
    };
    return this.http.post<any>('http://localhost:3000/checkPin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  publishSurvey(survey: ISurvey): Observable<any> {
    const requestBody: any = {
      survey: survey
    };
    return this.http.post<any>('http://localhost:3000/publishSurvey', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getSurvey(pin: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getSurvey/${pin}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  submitSurveyResults(results: ISurvey): Observable<any> {
    const requestBody: any = {
      results: results
    };
    return this.http.post<any>(`http://localhost:3000/submitSurveyResults`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
