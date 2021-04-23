import { Component, OnInit } from '@angular/core';
import { DestinosService, Locacion } from '../../services/destinos.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss']
})
export class DestinosComponent implements OnInit {

  locaciones: any[] = [];
  selectedId = '';
  locacion: Locacion = { nombre: "", descripcion: "" };
  locacionDialog: boolean;
  submitted: boolean;

  constructor(
    private locacionesService: DestinosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getlocaciones();
  }

  getlocaciones() {
    this.locacionesService.getDestinos('100').subscribe(res => {
      console.log(res);
      this.locaciones = res.locaciones;
    });
  }


  openNew() {
    this.locacion = { nombre: "", descripcion: "" };
    this.submitted = false;
    this.locacionDialog = true;
    console.log('open New')
  }


  editLocacion(locacion: Locacion) {
    console.log(locacion);
    this.locacion = { ...locacion };
    this.locacionDialog = true;
    console.log(this.locacion);
  }


  hideDialog() {
    this.locacionDialog = false;
    this.submitted = false;
  }

  showConfirm(id) {
    console.log('Showconfirm');
    this.selectedId = id;
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas borrar este Destino?',
      accept: () => {
        console.log('Confirmado');
        this.deletelocacion();
      }
    });
  }



  onSubmit() {
    this.submitted = true;
    console.log(this.locacion.nombre, 'locacion nombre');
    if (this.locacion.nombre.trim() && this.locacion.descripcion.trim() ) {
      if (this.locacion._id) {

        try {
          this.locacionesService.putDestino(this.locacion).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Actualización Exitosa!', detail: res.message, });
              this.getlocaciones();
            }
          })

        } catch (error) {

        }


      }
      else {
        try {
          console.log('tratando de crear locacion')
          this.locacionesService.postDestino(this.locacion).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Registro Exitoso', detail: res.message, });
              this.getlocaciones();
            }
          })
        } catch (error) {

        }
      }

      //  this.products = [...this.products];
      this.locacionDialog = false;
      this.locacion = {};
    }
  }


  deletelocacion() {

    console.log(this.selectedId);
    this.locacionesService.deleteDestino(this.selectedId).subscribe(res => {
      if (res.success) {
        this.getlocaciones();

        this.messageService.add({ severity: 'success', summary: '¡Resgistro Eliminado!', detail: res.message });
      } else {
        console.log(res.err);
      }
    });

  }

}
