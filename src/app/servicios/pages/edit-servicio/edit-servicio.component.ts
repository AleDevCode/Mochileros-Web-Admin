import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoriasService } from 'src/app/categorias/services/categorias.service';
import { DestinosService } from 'src/app/destinos/services/destinos.service';
import { EmpresasService } from 'src/app/empresas/services/empresas.service';
import { Categoria } from 'src/app/models/categoria.model';
import { Destino } from 'src/app/models/destino.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Servicio } from 'src/app/models/servicio.model';
import { UploadService } from 'src/app/shared/services/upload.service';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-edit-servicio',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditServicioComponent implements OnInit {

  public items: MenuItem[];
  destinos: Destino[];
  empresas: Empresa[];
  categorias: Categoria[];
  fotos: Object[] = [];
  servicioForm: FormGroup;
  uploadedFiles: File[] = [];
  public id: String = "";
  servicio: Servicio;
  loading = true;

  constructor(
    private formBuilder: FormBuilder,
    private destinosService: DestinosService,
    private empresasService: EmpresasService,
    private categoriasService: CategoriasService,
    private uploadService: UploadService,
    private serviciosService: ServiciosService,
    private messageService: MessageService,
    private actRoute: ActivatedRoute, // Se utliza para obtener datos de la ruta actual
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.setServicioForm();
    this.getSelects();


    this.id = this.actRoute.snapshot.paramMap.get('id');

    this.serviciosService.getServicioById(this.id).subscribe(res => {
      console.log(res);
      this.servicio = res.servicio;
      console.log(this.servicio);
      this.servicioForm.patchValue({
        nombre: this.servicio.nombre,
        locacion_id: this.servicio.locacion_id,
        categoria_id: this.servicio.categoria_id,
        empresa_id: this.servicio.empresa_id,
        costo: this.servicio.costo,
        horario_apertura: this.servicio.horario_apertura,
        horario_cierre: this.servicio.horario_cierre,
        direccion: this.servicio.direccion,
        descripcion: this.servicio.descripcion,
      })
    });



    this.items = [
      { label: 'Dashboard', url: '../' },
      { label: 'Servicios', url: '/servicios' },
      { label: 'Crear Hospedaje', url: `/servicios/edit/${this.id}` },
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

  eliminarFoto(foto) {
    this.servicio.fotos = this.servicio.fotos.filter(f => f != foto);
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
      locacion_id: this.servicioForm.value.locacion_id._id,
      direccion: this.servicioForm.value.direccion,
      fotos: this.servicio.fotos,
      categoria_id: this.servicioForm.value.categoria_id._id,
      empresa_id: this.servicioForm.value.empresa_id._id,
    }


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
      this.serviciosService.putServicio(this.servicio, this.id).subscribe(res => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: '¡Actualización exitosa!', detail: res.message });
          this.loading = false;
           this.router.navigate(['/servicios']);

        }
      })
    } catch (error) {

      this.messageService.add({ severity: 'error', summary: '¡Ups, ha ocurrido un error!', detail: error.err });

    }

  }

}
