import { Injectable } from '@angular/core';
import { Contato } from '../../models/contato.type';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatosService extends BaseService<Contato> {

  constructor(protected override http: HttpClient) {
      super(http);
      this.baseUrl = 'http://localhost:8080/contatos';
  }
  gravarContato(data: Contato, idCliente: number): Observable<Contato> {
        return this.http.post<Contato>(`${this.baseUrl}/${idCliente}`, data);
    }
}
