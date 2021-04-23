import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';



import { AuthResponse, User } from '../../models/user.model';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: User;
  public token: string = "";

  get usuario() {

    return { ...this._usuario };
  }


  constructor(private http: HttpClient, private router: Router,   private messageService: MessageService,) { }



  login(email: string, password: string) {
    console.log("holaaaaaaaaa");

    const url = `${this.baseUrl}/users/login-admin`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body, httpOptions).subscribe(res => {
      console.log(res);

      if (res.success) {
        this.saveToken(res.token, res.expiresIn);
        this._usuario = {
          nombre: res.name,
          email: res.email,
          uid: res.uid
        };

        console.table(this._usuario);
        this.messageService.add({key: 'd', severity: 'success', summary: '¡Inicio de Sesión exitoso!', detail: res.message });

        this.router.navigate(['/dashboard']);
      } else {
        this.messageService.add({key: 'l', severity: 'error', summary: '¡Ops, ha ocurrido un error!', detail: res.message });
      }
    })
  }




  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.nombre!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.success;
        }),
        catchError(err => of(false))
      );

  }


  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this._usuario = {}; 
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  getUser() {
    const url = `${this.baseUrl}/users/profile`;

    return this.http.get<AuthResponse>(url, { headers: { 'Authorization': localStorage.getItem('ACCESS_TOKEN') || '' } });

  }


}
