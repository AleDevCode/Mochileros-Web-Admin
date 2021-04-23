import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import {Categoria} from '../../models/categoria.model';

export interface ServiceResponse {
  success: String;
  message: string;
  categorias?: [];
  categoria?: Categoria;
  err?: string
}



@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasURL = `${environment.baseUrl}/categoria`;
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCategorias(limit) {

    let params = new HttpParams()
      .set('limit', limit);

    return this.http.get<ServiceResponse>(this.categoriasURL + '/', { headers: { 'Authorization': this.token }, params },);
  }

  getCategoriaById(id) {

    let params = new HttpParams()
      .set('id', id);

    return this.http.get<ServiceResponse>(this.categoriasURL + '/' + id, { headers: { 'Authorization': this.token }, params });
  }

  postCategoria(categoria: Categoria) {
    console.log(categoria, "Categoria que se manda");
    return this.http.post<ServiceResponse>(this.categoriasURL + '/', categoria, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);

  }

  putCategoria(categoria: Categoria) {
    return this.http.put<ServiceResponse>(this.categoriasURL + '/' + categoria._id, categoria, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' } },);
  }

  deleteCategoria(id: string) {

    console.log(id, 'desde servicio')
    let params = new HttpParams()
      .set('id', id);

    return this.http.delete<ServiceResponse>(this.categoriasURL + '/' + id, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' }, params });
  }
}
