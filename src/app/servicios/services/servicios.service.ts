import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

import { environment } from 'src/environments/environment';
import { Servicio } from '../../models/servicio.model';


export interface ServiceResponse {
  success: string;
  message: string;
  err?: any;
  servicios?: [];
  servicio?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  serviciosURL = environment.baseUrl + '/servicio';
  token = this.authService.getToken();



  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private messageService: MessageService,

  ) { 


  }

  getServicios(limit) {

    let params = new HttpParams()
      .set('limit', limit);

    return this.http.get<ServiceResponse>(this.serviciosURL + '/', { headers: { 'Authorization': this.token }, params });
  }

  getServicioById(id) {

    let params = new HttpParams()
      .set('id', id);

    return this.http.get<ServiceResponse>(this.serviciosURL + '/' + id, { headers: { 'Authorization': this.token }, params });
  }

  postServicio(servicio: Servicio) {
    console.log(servicio, "Servicio que se manda");


    return this.http.post<ServiceResponse>(this.serviciosURL + '/', servicio, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);

  }

  putServicio(servicio: Servicio , id ) {
    console.log(servicio, "Servicio que se manda");


    return this.http.put<ServiceResponse>(this.serviciosURL + '/' + id,  servicio, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);

  }

  deleteServicio(id: string) {

    console.log(id, 'desde servicio')
    let params = new HttpParams()
      .set('id', id);

    return this.http.delete<ServiceResponse>(this.serviciosURL + '/' + id, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' }, params });
  }

}
