import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Empresa } from 'src/app/models/empresa.model';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {


  empresas: any[] = [];
  selectedId = '';
  empresa: Empresa = { nombre: "", descripcion: "", telefono: '' };
  empresaDialog: boolean;
  submitted: boolean;

  constructor(
    private empresasService: EmpresasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresasService.getEmpresas('100').subscribe(res => {
      console.log(res);
      this.empresas = res.empresas;
    });
  }


  openNew() {
    this.empresa = { nombre: "", descripcion: "", telefono: "" };
    this.submitted = false;
    this.empresaDialog = true;
    console.log('open New')
  }


  editEmpresa(empresa: Empresa) {
    console.log(empresa);
    this.empresa = { ...empresa };
    this.empresaDialog = true;
    console.log(this.empresa);
  }


  hideDialog() {
    this.empresaDialog = false;
    this.submitted = false;
  }

  showConfirm(id) {
    console.log('Showconfirm');
    this.selectedId = id;
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas borrar esta Empresa?',
      accept: () => {
        console.log('Confirmado');
        this.deleteEmpresa();
      }
    });
  }



  onSubmit() {
    this.submitted = true;
    if (this.empresa.nombre.trim() && this.empresa.descripcion.trim() && this.empresa.telefono.trim()) {
      if (this.empresa._id) {

        try {
          this.empresasService.putEmpresa(this.empresa).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Actualización Exitosa!', detail: res.message, });
              this.getEmpresas();
              this.empresa = { nombre: "", descripcion: "", telefono: "" };
            }
          })

        } catch (error) {

        }


      }
      else {
        try {
          console.log('tratando de crear locacion')
          this.empresasService.postEmpresa(this.empresa).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Registro Exitoso', detail: res.message, });
              this.getEmpresas();
              this.empresa = { nombre: "", descripcion: "", telefono: "" };
            }
          })
        } catch (error) {

        }
      }

      //  this.products = [...this.products];
      this.empresaDialog = false;
      this.empresa = { nombre: "", descripcion: "", telefono: '' };
    }
  }


  deleteEmpresa() {

    console.log(this.selectedId);
    this.empresasService.deleteEmpresa(this.selectedId).subscribe(res => {
      if (res.success) {
        this.getEmpresas();

        this.messageService.add({ severity: 'success', summary: '¡Resgistro Eliminado!', detail: res.message });
      } else {
        console.log(res.err);
      }
    });

  }

}
