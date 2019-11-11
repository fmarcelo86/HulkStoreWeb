import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Venta } from './venta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  baseUrl: string = "http://localhost:8888/HulkStore";

  constructor(private http: HttpClient) { }
  
  getVentas(): Observable<Venta[]> {
    const url = `${this.baseUrl}/marca`;
    return this.http.get<Venta[]>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }
}
