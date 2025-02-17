import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Pet } from '../../models/pet.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService extends BaseService<Pet>{

    constructor(protected override http: HttpClient) {
        super(http);
        this.baseUrl = 'http://localhost:8080/pets';
    }
}
