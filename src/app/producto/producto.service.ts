import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Producto } from './producto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  baseUrl: string = "http://localhost:8888/HulkStore";

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    const url = `${this.baseUrl}/producto`;
    return this.http.get<Producto[]>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  setProducto(producto: Producto): Observable<Producto> {
    console.log(producto);
    const url = `${this.baseUrl}/producto`; 
    return this.http.post<Producto>(url, producto, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  updateProducto(producto: Producto): Observable<Producto> {
    const url = `${this.baseUrl}/producto`;
    return this.http.put<Producto>(url, producto, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }

  deleteProducto(idProducto: number): Observable<void> {
    const url = `${this.baseUrl}/producto/${idProducto}`;
    return this.http.delete<void>(url, httpOptions)
    .pipe(catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
    }));
  }
}
