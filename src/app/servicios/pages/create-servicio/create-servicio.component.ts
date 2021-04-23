import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { DestinosService } from '../../../destinos/services/destinos.service';
import { EmpresasService } from '../../../empresas/services/empresas.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { UploadService } from '../../../shared/services/upload.service';
import { Destino } from '../../../models/destino.model';
import { Empresa } from '../../../models/empresa.model';
import { Categoria } from '../../../models/categoria.model';
import { Foto } from '../../../models/foto.model'
import { Servicio } from 'src/app/models/servicio.model';
import { ServiciosService } from '../../services/servicios.service';
import { MenuItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-create-servicio',
  templateUrl: './create-servicio.component.html',
  styleUrls: ['./create-servicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateServicioComponent implements OnInit {

  public items: MenuItem[];
  destinos: Destino[];
  empresas: Empresa[];
  categorias: Categoria[];
  fotos: Object[] = [];
  selectedCity: City;
  servicioForm: FormGroup;
  uploadedFiles: File[] = [];

  servicio: Servicio;
  loading = true; 

  private _message : Subject<string>  = new Subject<string>()

  constructor(
    private formBuilder: FormBuilder,
    private destinosService: DestinosService,
    private empresasService: EmpresasService,
    private categoriasService: CategoriasService,
    private uploadService: UploadService,
    private serviciosService: ServiciosService,
    private messageService: MessageService,
    private router: Router,
 
  ) {

  }

  ngOnInit(): void {
    this.setServicioForm();
    this.getSelects();

    this.items = [
      {label:'Dashboard', url : '../'},
      {label:'Servicios', url : '/servicios'},
      {label:'Crear Hospedaje', url : `/servicios/create`},
  ];


  }

  setServicioForm() {
    this.servicioForm = this.formBuilder.group({
      nombre: (['', [Validators.required]]),
      locacion_id: ['', [Validators.required]],
      empresa_id: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      horario_apertura: ['', [Validators.required]],
      horario_cierre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fotos: ['', [,]]
    });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onRemove(event) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file != event.file);
  }

  getDestinos() {

    this.destinosService.getDestinos('100').subscribe(res => {
      console.log(res.locaciones);
      this.destinos = res.locaciones;
    });

  }

  getEmpresas() {

    this.empresasService.getEmpresas('100').subscribe(res => {
      console.log(res.empresas);
      this.empresas = res.empresas;
    });

  }

  getCategorias() {

    this.categoriasService.getCategorias('100').subscribe(res => {
      console.log(res.categorias);
      this.categorias = res.categorias;
    });

  }

  filtrarEmpresas() {
    this.empresas = this.empresas.filter(e => e.locacion_id == this.servicioForm.value.locacion_id);
  }

  getSelects() {
    this.getCategorias();
    this.getDestinos();
    this.getEmpresas();
  }

  async onSubmit() {

    this.servicio = {
      nombre: this.servicioForm.value.nombre,
      descripcion: this.servicioForm.value.descripcion,
      costo: this.servicioForm.value.costo,
      horario_apertura: this.servicioForm.value.horario_apertura,
      horario_cierre: this.servicioForm.value.horario_cierre,
      direccion: this.servicioForm.value.direccion,
      locacion_id: this.servicioForm.value.locacion_id._id,
      categoria_id: this.servicioForm.value.categoria_id._id,
      empresa_id: this.servicioForm.value.empresa_id._id,

    }

    this.servicio.fotos = [];

    // Suben las fotos a Cloudinary
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      const formData = new FormData();
      formData.append('image', this.uploadedFiles[i]);

      await this.uploadService.postFileUpload(formData).toPromise().then((res) => {

        console.log(res);

        this.servicio.fotos.push({

          url_img: String(res),
          alt_img: this.uploadedFiles[i].name
        })
      }
      );
    }


    try {
      this.loading = true; 
      this.serviciosService.postServicio(this.servicio).subscribe(res => {
        if (res.success) {

          this.messageService.add({ severity: 'success', summary: '¡Registro exitoso!', detail: res.message });
          this.loading = false; 
          this.router.navigate(['/servicios']);

        }
      })
    } catch (error) {

      this.messageService.add({ severity: 'error', summary: '¡Ups, ha ocurrido un error!', detail: error.err });

    }




    console.log(this.fotos);
    // this.fotos = [];
  }

}


