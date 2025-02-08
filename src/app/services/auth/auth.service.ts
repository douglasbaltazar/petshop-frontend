import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../models/login-response.type';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.API_URL}/auth`;
  constructor(private http: HttpClient, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  login(cpf: string, password: string){
    return this.http.post<LoginResponse>(this.baseUrl + "/login", { cpf, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("nome", value.nome),
        sessionStorage.setItem("perfil", value.perfil)
      })
    )
  }

  signup(name: string, cpf: string, password: string){
    return this.http.post<LoginResponse>(this.baseUrl + "/register", { name, cpf, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("nome", value.nome),
        sessionStorage.setItem("perfil", value.perfil)
      })
    )
  }
}
