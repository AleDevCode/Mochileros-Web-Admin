import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from '../../../environments/environment';

export interface ServiceResponse {
  succes: String;
  message: String;
  servicios: [];
}

@Injectable({
  providedIn: 'root'
})
export class HospedajesService {

  hospedajeURL = environment.baseUrl + '/servicio';
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHospedajes(limit) {

    let params = new HttpParams()
    .set('limit', limit );

    return this.http.get<ServiceResponse>(this.hospedajeURL + '/hospedajes', { headers: { 'Authorization': this.token } , params}, );
  }
}
