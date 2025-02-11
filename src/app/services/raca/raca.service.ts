import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Raca } from '../../models/raca.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RacaService extends BaseService<Raca> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = 'http://localhost:8080/api/racas'; // Definir o endpoint específico
  }
}
