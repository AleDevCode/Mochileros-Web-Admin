export interface AuthResponse {
  success: boolean;
  email?: string;
  token?: string;
  message?: string;
  name?: string; 
  rol: string;
  nombre? : string;
  uid? : string;
  expiresIn? :string;
}


export interface User {
  uid?: String;
  nombre?: String;
  email?: String;
  url_foto?: String;
  rol?: String;
  password?: String;
  bio?: String;
  createdAt?: Date;
  updatesAt?: Date;
}