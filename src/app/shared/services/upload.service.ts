import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadURL = `${environment.baseUrl}/upload`;
  token = this.authService.getToken();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  postFileUpload(formData : FormData) {

   const formDataHeader = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: this.token
      })
    };

    console.log('servicio de subida');
    return this.http.post(this.uploadURL, formData, formDataHeader);
  }


  postFileUploadMultiple(formData : FormData) {

    const formDataHeader = {
       headers: new HttpHeaders({
         Accept: 'application/json',
         'Access-Control-Allow-Origin': '*',
         Authorization: this.token
       })
     };
 
     console.log('servicio de subida');
     return this.http.post(this.uploadURL + "/multiple", formData, formDataHeader);
   }


}
