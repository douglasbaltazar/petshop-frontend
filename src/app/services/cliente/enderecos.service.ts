import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Endereco } from '../../models/endereco.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecosService extends BaseService<Endereco> {

  constructor(protected override http: HttpClient) {
      super(http);
      this.baseUrl = 'http://localhost:8080/enderecos';
  }

  gravarEndereco(data: Endereco, idCliente: number): Observable<Endereco> {
      return this.http.post<Endereco>(`${this.baseUrl}/${idCliente}`, data);
  }

}
