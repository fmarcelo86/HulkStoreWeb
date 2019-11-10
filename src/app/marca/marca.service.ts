import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Marca } from './marca';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  baseUrl: string = "http://localhost:8888/HulkStore";

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<Marca[]> {
    const url = `${this.baseUrl}/marca`; 
    return this.http.get<Marca[]>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  setMarca(marca: Marca): Observable<Marca> {
    const url = `${this.baseUrl}/marca`; 
    return this.http.post<Marca>(url, marca, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  updateMarca(marca: Marca): Observable<Marca> {
    const url = `${this.baseUrl}/marca`;
    return this.http.put<Marca>(url, marca, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  deleteMarca(idMarca: number): Observable<void> {
    const url = `${this.baseUrl}/marca/${idMarca}`;
    return this.http.delete<void>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }
}
