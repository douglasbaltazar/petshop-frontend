import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Atendimento } from '../../models/atendimento.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService extends BaseService<Atendimento> {

    constructor(protected override http: HttpClient) {
      super(http);
      this.baseUrl = 'http://localhost:8080/atendimentos';
    }
}
