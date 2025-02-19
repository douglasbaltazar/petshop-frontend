import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const authToken = sessionStorage.getItem('auth-token') || "";
    return this.validate(authToken).pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/']));
      })
    );
  }

  validate(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/validate/${token}`);
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

  signup(nome: string, cpf: string, password: string, perfil: string = 'cliente'){
    return this.http.post<LoginResponse>(this.baseUrl + "/register", { cpf, nome, perfil, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("nome", value.nome),
        sessionStorage.setItem("perfil", value.perfil)
      })
    )
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
