import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../models/cliente.type';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = 'http://localhost:8080/clientes';
  }
}
