import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.type';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {
  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = 'http://localhost:8080/usuarios';
  }
}

