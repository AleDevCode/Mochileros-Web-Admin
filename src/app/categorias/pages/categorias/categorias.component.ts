import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Categoria } from 'src/app/models/categoria.model';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  selectedId = '';
  categoria: Categoria = { nombre: "", };
  categoriaDialog: boolean;
  submitted: boolean;

  constructor(
    private categoriasService: CategoriasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriasService.getCategorias('100').subscribe(res => {
      console.log(res);
      this.categorias = res.categorias;
    });
  }


  openNew() {
    this.categoria = { nombre: "" };
    this.submitted = false;
    this.categoriaDialog = true;
    console.log('open New')
  }


  editCategoria(categoria: Categoria) {
    console.log(categoria);
    this.categoria = { ...categoria };
    this.categoriaDialog = true;
    console.log(this.categoria);
  }


  hideDialog() {
    this.categoriaDialog = false;
    this.submitted = false;
  }

  showConfirm(id) {
    console.log('Showconfirm');
    this.selectedId = id;
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas borrar esta categoría?',
      accept: () => {
        console.log('Confirmado');
        this.deleteCategoria();
      }
    });
  }



  onSubmit() {
    this.submitted = true;
    console.log(this.categoria.nombre);
    if (this.categoria.nombre.trim()) {
      if (this.categoria._id) {

        try {
          this.categoriasService.putCategoria(this.categoria).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Actualización Exitosa!', detail: res.message, });
              this.getCategorias();
            }
          })

        } catch (error) {

        }


      }
      else {
        try {
          console.log('tratando de crear categoria')
          this.categoriasService.postCategoria(this.categoria).subscribe(res => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Registro Exitoso', detail: res.message, });
              this.getCategorias();
            }
          })
        } catch (error) {

        }
      }

      //  this.products = [...this.products];
      this.categoriaDialog = false;
      this.categoria = { nombre: ''};
    }
  }


  deleteCategoria() {

    console.log(this.selectedId);
    this.categoriasService.deleteCategoria(this.selectedId).subscribe(res => {
      if (res.success) {
        this.getCategorias();

        this.messageService.add({ severity: 'success', summary: '¡Resgistro Eliminado!', detail: res.message });
      } else {
        console.log(res.err);
      }
    });

  }




}
