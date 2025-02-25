import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected baseUrl: string = ''; // Deve ser definido nos serviços que estendem este

  constructor(protected http: HttpClient) {}

  listar(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}`);
  }

  gravar(data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, data);
  }

  paginado(page: number, size: number): Observable<{ content: T[]; totalElements: number }> {
    return this.http.get<{ content: T[]; totalElements: number }>(
      `${this.baseUrl}/paginado?page=${page}&size=${size}`
    );
  }

  atualizar(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data);
  }

  apagarPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getDto(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }
}
