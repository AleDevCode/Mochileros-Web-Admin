export interface Empresa {
    _id?: String;
    nombre: String;
    telefono: String; 
    descripcion: String;
    correo?: String,
    sitio_web?: String,
    locacion_id ?: String,
    portada_url?: String,
    createdAt?: Date;
    updatesAt?: Date;
  }