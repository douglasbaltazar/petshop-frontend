import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from '../../models/info.type';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  protected baseUrl: string = 'http://localhost:8080/infos'; // Deve ser definido nos serviços que estendem este

  constructor(protected http: HttpClient) {}

  getInfos(): Observable<Info> {
      return this.http.get<Info>(`${this.baseUrl}`);
  }
}
