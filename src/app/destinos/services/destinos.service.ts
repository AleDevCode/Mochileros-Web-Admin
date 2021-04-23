import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

export interface ServiceResponse {
  success: String;
  message: string;
  locaciones?: [];
  err?: string; 
}

export interface Locacion {
  _id?: String;
  nombre?: String;
  descripcion?: String; 
}

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  destinosURL = `${environment.baseUrl}/locacion`;
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDestinos(limit) {

    let params = new HttpParams()
    .set('limit', limit );

    return this.http.get<ServiceResponse>(this.destinosURL + '/', { headers: { 'Authorization': this.token } , params}, );
  }

  getDestinoById(id) {

    let params = new HttpParams()
      .set('id', id);

    return this.http.get<ServiceResponse>(this.destinosURL + '/' + id, { headers: { 'Authorization': this.token }, params });
  }

  postDestino(locacion: Locacion) {
    console.log(locacion, "Locación que se manda");
    return this.http.post<ServiceResponse>(this.destinosURL + '/', locacion, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);

  }

  putDestino(locacion: Locacion) {
    return this.http.put<ServiceResponse>(this.destinosURL + '/' + locacion._id, locacion, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);
  }

  deleteDestino(id: string) {

    console.log(id, 'desde servicio')
    let params = new HttpParams()
      .set('id', id);

    return this.http.delete<ServiceResponse>(this.destinosURL + '/' + id, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' }, params });
  }



}
