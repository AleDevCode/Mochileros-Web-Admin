import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { Empresa } from 'src/app/models/empresa.model';

export interface ServiceResponse {
  success: String;
  message?: string;
  empresas?: [];
  err ?: string; 
}


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {


  empresasURL = `${environment.baseUrl}/empresa`;
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getEmpresas(limit) {

    let params = new HttpParams()
      .set('limit', limit);

    return this.http.get<ServiceResponse>(this.empresasURL + '/', { headers: { 'Authorization': this.token }, params },);
  }

  getEmpresaById(id) {

    let params = new HttpParams()
      .set('id', id);

    return this.http.get<ServiceResponse>(this.empresasURL + '/' + id, { headers: { 'Authorization': this.token }, params });
  }

  postEmpresa(empresa: Empresa) {
    console.log(empresa, "Servicio que se manda");


    return this.http.post<ServiceResponse>(this.empresasURL + '/', empresa, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);

  }

  putEmpresa(empresa: Empresa) {
    return this.http.put<ServiceResponse>(this.empresasURL + '/' + empresa._id, empresa, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);
  }


  deleteEmpresa(id: string) {

    console.log(id, 'desde servicio')
    let params = new HttpParams()
      .set('id', id);

    return this.http.delete<ServiceResponse>(this.empresasURL + '/' + id, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' }, params });
  }



}
