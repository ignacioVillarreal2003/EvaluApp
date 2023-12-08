import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IEncuesta } from './IEncuesta';


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

  subirEncuesta(encuesta: IEncuesta): Observable<any> {
    const requestBody: any = {
      encuesta: encuesta
    };
    return this.http.post<any>('http://localhost:3000/subirEncuesta', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getEncuesta(pin: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getEncuesta/${pin}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getEncuestaSinCalificacion(pin: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/getEncuestaSinCalificacion/${pin}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  subirResultadosEncuesta(resultados: IEncuesta): Observable<any> {
    const requestBody: any = {
      resultados: resultados
    };
    return this.http.post<any>(`http://localhost:3000/subirResultadosEncuesta`, requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

}
