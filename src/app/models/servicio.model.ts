import {Foto} from '../models/foto.model';

export interface Servicio {

    nombre: String;
    descripcion: String;
    costo: Number;
    horario_apertura: String;
    horario_cierre: String;
    direccion?: String;
    fotos?: Object[];
    locacion_id: String;
    categoria_id: String;
    empresa_id: String;
    createdAt?: Date;
    updatesAt?: Date;
}