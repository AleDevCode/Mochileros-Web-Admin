import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

export interface ServiceResponse {
  success: String;
  message: string;
  users?: [];
  user?: any;
  err?: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersURL = `${environment.baseUrl}/users`;
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUsers(limit) {

    let params = new HttpParams()
      .set('limit', limit);

    return this.http.get<ServiceResponse>(this.usersURL + '/', { headers: { 'Authorization': this.token }, params },);
  }

  deleteUser(id: string) {

    console.log(id, 'desde servicio')
    let params = new HttpParams()
      .set('id', id);

    return this.http.delete<ServiceResponse>(this.usersURL + '/' + id, { headers: { 'Authorization': this.token, 'Content-Type': 'application/json' }, params });
  }


}
