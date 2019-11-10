import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Categoria } from './categoria';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  baseUrl: string = "http://localhost:8888/HulkStore";

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categoria`;
    return this.http.get<Categoria[]>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  setCategoria(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria`; 
    return this.http.post<Categoria>(url, categoria, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}/categoria`;
    return this.http.put<Categoria>(url, categoria, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  deleteCategoria(idCategoria: number): Observable<void> {
    const url = `${this.baseUrl}/categoria/${idCategoria}`;
    return this.http.delete<void>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }
}
