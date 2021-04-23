import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service'
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiciosComponent implements OnInit {

  servicios: any[] = [];
  selectedId = '';

  constructor(
    private serviciosService: ServiciosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.getServicios();


  }

  showConfirm(id) {
    console.log('Showconfirm');
    this.selectedId = id;
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas borrar este servicio?',
      accept: () => {
        console.log('Confirmado');
        this.deleteServicio();
      }
    });
  }

  onConfirm() {
    this.deleteServicio();
    this.messageService.clear();
  }

  onReject() {
    this.messageService.clear();
  }


  deleteServicio() {

    console.log(this.selectedId);
    this.serviciosService.deleteServicio(this.selectedId).subscribe(res => {
      if (res.success) {
        this.getServicios();

        this.messageService.add({ severity: 'success', summary: '¡Resgistro Eliminado!', detail: res.message });
      } else {
        console.log(res.err);
      }
    });

  }

  getServicios() {
    this.serviciosService.getServicios('100').subscribe(res => {
      console.log(res);
      this.servicios = res.servicios;
    });
  }
}
