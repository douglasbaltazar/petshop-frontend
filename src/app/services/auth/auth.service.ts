import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { LoginResponse } from '../../models/login-response.type';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.API_URL}/auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<any>(this.getTokenInfo());
    this.currentUser = this.currentUserSubject.asObservable();

  }

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

  getTokenInfo() {
    const token = sessionStorage.getItem('auth-token');
    if (token) {
      console.log(JSON.parse(atob(token.split('.')[1])))
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
  
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user && user.perfil === 'Admin';
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
