import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cliente } from './cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: string = "http://localhost:8888/HulkStore";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    const url = `${this.baseUrl}/cliente`;
    return this.http.get<Cliente[]>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  getClienteByCedula(cedula: string): Observable<Cliente> {
    const url = `${this.baseUrl}/cliente/cedula/${cedula}`;
    return this.http.get<Cliente>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  setCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/cliente`; 
    return this.http.post<Cliente>(url, cliente, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/cliente`;
    return this.http.put<Cliente>(url, cliente, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  deleteCliente(idCliente: number): Observable<void> {
    const url = `${this.baseUrl}/cliente/${idCliente}`;
    return this.http.delete<void>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }
}
